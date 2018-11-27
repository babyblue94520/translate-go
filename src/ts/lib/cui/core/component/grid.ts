import { CUI } from '../cui';

/**
 * 表格
 */
export namespace Grid {
    /**
     * 表格
     */
    // tslint:disable-next-line:no-shadowed-variable
    export class Grid<T> {
        protected _config: IConfig<T> = {
            size: 50,
            height: 'auto',
            width: '100%',
            index: false,
            select: false,
            singleSort: true,
            rowColumns: null,
            contentColumns: null,
            onLoad: null
        };
        protected _element: HTMLElement;
        protected _columns: IGridColumn<T>[];
        protected _columnContents: IGridColumn<T>[];
        protected _headerElements: HTMLElement[];
        protected _gridElement: HTMLElement;
        protected _tableElement: HTMLElement;
        protected _theadElement: HTMLElement;
        protected _tbodyElement: HTMLElement;
        protected _footerElement: HTMLElement;
        protected _footerLeftElement: HTMLElement;
        protected _footerRightElement: HTMLElement;

        protected _checkedAllElement: HTMLInputElement;
        protected _checkedAllText: Text;

        protected _loadMoreElement: HTMLDivElement;

        protected _rowTotalTextNode: Text;
        protected _rowCUItTextNode: Text;
        protected _rowEndTextNode: Text;

        protected _defaultSorts = {};
        protected _sorts = {};
        protected _pageable: IPageable;
        protected _page: IPage<T>;
        protected _realPage = false;
        protected _count = 0;
        protected _reloadPage = 0;

        protected _checkboxs: IGridChecbox[] = [];
        protected _selectedRecords: T[] = [];

        constructor(config: IConfig<T>) {
            this._config = CUI.deepClone(this._config, config);
            // checkbox
            if (this._config.select) {
                this._config.rowColumns.splice(0, 0, {
                    checkbox: true,
                    name: '',
                    value: '',
                    width: '1%',
                    align: 'center',
                } as IGridColumnConfig<T>);
            }
            // 序號
            if (this._config.index) {
                this._config.rowColumns.splice(0, 0, {
                    name: '',
                    value: '',
                    width: '1%',
                    onRender: (value, record, index) => {
                        if (this._realPage) {
                            return this._page.number * this._page.size + index + 1;
                        } else {
                            return index + 1;
                        }
                    }
                });
            }
            this.initElement();
            this.initPageable();
            this.initPage();
            this.setFooterPageInfo();
        }

        /**
         * 取得element
         */
        public getElement(): HTMLElement {
            return this._element;
        }

        /**
         * 取得選取的列
         */
        public getSelecteds(): T[] {
            return this._selectedRecords;
        }

        public resize(height: number) {
            this._gridElement.style.height = (height - this._gridElement.offsetTop - this._footerElement.offsetHeight - 10) + 'px';
        }

        public initPage() {
            this._page = {
                content: [],
                number: 0,
                numberOfElements: 0,
                sort: this.getPageSort(),
                size: this._config.size,
                first: true,
                last: true,
                totalElements: 0,
                totalPages: 0
            };
        }

        /**
         * 初始化Pageable
         */
        public initPageable() {
            this._sorts = CUI.deepClone(this._defaultSorts);
            this._pageable = {
                size: this._config.size,
                page: 0,
                sort: this.getSortArray(),
            };
            this._reloadPage = 0;
            this.setHeaderColumnSort();
        }

        /**
         * 匯出html
         */
        public export(config: IExportConfig, records: T[]): string {
            let html = '<table style="' + (config.tableStyle || '') + '">';
            html += '<thead ><tr style="' + (config.theadStyle || '') + '">';
            let column: IGridColumn<T>, columnConfig: IGridColumnConfig<T>;
            for (let i in this._columns) {
                column = this._columns[i];
                columnConfig = column.config;
                html += '<th align="center" nowrap width="' + columnConfig.width + '">' + columnConfig.name + '</th>';
            }
            html += '</tr></thead>';
            html += '<tbody>';
            let record;
            for (let i = 0, l = records.length; i < l; i++) {
                record = records[i];
                if (!record) {
                    continue;
                }
                html += '<tr>';
                let value;
                for (let j in this._columns) {
                    column = this._columns[j];
                    columnConfig = column.config;
                    if (!columnConfig.checkbox) {
                        value = column.render.call(null, columnConfig.onRender, GridBuilder.getValue(columnConfig.value, record), record, i);
                        html += '<td align="' + columnConfig.align + '" nowrap style="' + config.tdStyle + '" width="' + columnConfig.width + '">' + value + '</td>';
                    }
                }
                html += '</tr>';
            }
            html += '</tbody></table>';
            return html;
        }

        public clean() {
            this.initPage();
            this.doLoadPage(true, this._page);
        }

        /**
         * 載入資料
         */
        public load(page?: IPage<T> | T[]) {
            if (page) {
                this._page = this.covertPage(page);
            }
            this.initPageable();
            this.onLoad();
        }

        /**
         * 刷新
         * 當前所有加載的資料
         */
        public reload() {
            // 計數刷新前page index
            this._reloadPage = this._pageable.page;
            // 計算總共要拉回多少資料
            this._pageable.size = this._page.number * this._page.size + this._page.numberOfElements;
            if (this._pageable.size < this._config.size) {
                this._pageable.size = this._config.size;
            }
            this._pageable.page = 0;
            this.onLoad(true);
        }

        /**
         * 排序事件
         */
        protected onSort(id, sort) {
            if (sort) {
                if (this._config.singleSort) {
                    this._sorts = {};
                }
                this._sorts[id] = sort;
            } else {
                delete this._sorts[id];
            }
            this._pageable.sort = this.getSortArray();
            this.onLoad();
        }

        /**
         * 排序事件
         */
        protected onCheckedAll(e) {
            if (e.target != this._checkedAllElement) {
                this._checkedAllElement.checked = !this._checkedAllElement.checked;
            }
            this._selectedRecords.length = 0;
            let gridCheckbox;
            if (this._checkedAllElement.checked) {
                for (let i in this._checkboxs) {
                    gridCheckbox = this._checkboxs[i];
                    gridCheckbox.tr.classList.add('selected');
                    gridCheckbox.checkbox.checked = true;
                    this._selectedRecords.push(gridCheckbox.record);
                }
            } else {
                for (let i in this._checkboxs) {
                    gridCheckbox = this._checkboxs[i];
                    gridCheckbox.tr.classList.remove('selected');
                    gridCheckbox.checkbox.checked = false;
                }
            }
            this._checkedAllText.data = '(' + this._selectedRecords.length + ')';
        }

        /**
         * 載入事件
         */
        protected onLoad(clean: boolean = true) {
            if (clean) {
                this._count = 0;
                this._selectedRecords.length = 0;
                this._checkboxs.length = 0;
            } else {
                this._count += this._page.numberOfElements;
            }
            if (this._config.onLoad instanceof Function) {
                this._config.onLoad(this._pageable, this.doLoadPage.bind(this, clean));
            } else {
                this._page.number = this._pageable.page;
                this.doLoadPage(clean, this._page);
            }
        }

        /**
         *
         * @param page
         */
        protected covertPage(page: IPage<T> | T[]): IPage<T> {
            if (CUI.isArray(page)) {
                let length = (<T[]>page).length;
                page = {
                    content: page as T[],
                    number: this._pageable.page,
                    sort: this.getPageSort(),
                    size: this._pageable.size,
                    totalElements: length,
                } as IPage<T>;
                this._realPage = false;
            } else {
                this._realPage = true;
            }
            return page as IPage<T>;
        }

        /**
         * 執行載入資料
         */
        protected doLoadPage(clean: boolean, page: IPage<T> | T[]) {
            if (page) {
                page = this.covertPage(page);
                let total = page.totalElements;
                let size = page.size;
                let totalPage = Math.ceil(total == 0 ? 0 : total / size);
                page.first = (page.number == 0);
                page.last = (total == 0) || (page.number + 1 == totalPage);
                page.totalPages = totalPage;
                page.numberOfElements = page.content.length > page.size ? page.size : page.content.length;
                this._page = page;
                this.updateSorts(page);
                this.resetPageable(page);
                this.setHeaderColumnSort();
                if (this._columnContents && this._columnContents.length > 0) {
                    this.loadTbody(this._page.content, this.tbodyAppendChildContent, clean);
                } else {
                    this.loadTbody(this._page.content, this.tbodyAppendChild, clean);
                }
            } else {
                if (clean) {
                    this._tbodyElement.innerHTML = '';
                }
            }
            this.setFooterPageInfo();
        }

        /**
         * 初始化grid element
         */
        protected initElement() {
            this._element = document.createElement('div');
            this._element.className = ClassName.Grid;
            if (this._config.width) {
                this._element.style.width = this._config.width;
            }
            this._gridElement = document.createElement('div');
            this._element.appendChild(this._gridElement);
            if (this._config.height) {
                this._gridElement.style.height = this._config.height;
            }
            this._gridElement.style.height = this._config.height;
            this._gridElement.className = ClassName.Container;
            this._tableElement = document.createElement('table');
            this._gridElement.appendChild(this._tableElement);
            this._theadElement = document.createElement('thead');
            this._tableElement.appendChild(this._theadElement);
            this._tbodyElement = document.createElement('tbody');
            this._tableElement.appendChild(this._tbodyElement);
            this._footerElement = document.createElement('div');
            this._element.appendChild(this._footerElement);
            this._footerElement.className = ClassName.Footer;
            this.initHeaderColumn();
            this.initFooter();
        }

        /**
         * 初始化表頭
         */
        protected initHeaderColumn() {
            this._headerElements = [];
            this._columns = [];
            let colConfig: IGridColumnConfig<T>, hElement: HTMLElement;
            let tr = document.createElement('tr');
            let column;
            for (let i in this._config.rowColumns) {
                column = this._config.rowColumns[i];
                if (!column) {
                    continue;
                }
                if (column.checkbox) {
                    this._columns.push({
                        config: column,
                        render: this.checkboxRender
                    } as IGridColumn<T>);
                    hElement = GridBuilder.buildGridHeaderCheckboxElement(colConfig);
                    this._checkedAllElement = document.createElement('input');
                    this._checkedAllElement.type = 'checkbox';
                    this._checkedAllElement.className = 'checkbox';
                    this._checkedAllText = document.createTextNode('');
                    hElement.appendChild(this._checkedAllElement);
                    hElement.appendChild(this._checkedAllText);
                    hElement.addEventListener('click', this.onCheckedAll.bind(this));
                } else {
                    colConfig = GridBuilder.buildColumnConfig(column);
                    this.setSorts(colConfig);
                    this._columns.push({
                        config: colConfig,
                        render: GridBuilder.builderGridColumnRenderHandler(colConfig)
                    } as IGridColumn<T>);
                    hElement = GridBuilder.buildGridHeaderElement(colConfig);
                    hElement.addEventListener('click', onHeaderClick.bind(hElement, colConfig.value, this.onSort.bind(this)));
                }

                tr.appendChild(hElement);
                this._headerElements.push(hElement);
            }
            this._theadElement.appendChild(tr);

            this._columnContents = [];
            if (this._config.contentColumns) {
                for (let i in this._config.contentColumns) {
                    column = this._config.contentColumns[i];
                    if (!column) {
                        continue;
                    }
                    colConfig = GridBuilder.buildColumnConfig(column);
                    this._columnContents.push({
                        config: colConfig,
                        render: GridBuilder.builderGridColumnRenderHandler(colConfig)
                    } as IGridColumn<T>);
                }
            }
        }

        /**
         * 底部
         */
        protected initFooter() {
            this._footerLeftElement = document.createElement('div');
            this._footerLeftElement.className = 'left-info';
            this._loadMoreElement = document.createElement('div');
            this._loadMoreElement.className = ClassName.LoadMore;
            this._loadMoreElement.innerText = '載入更多';
            this._loadMoreElement.addEventListener('click', this.onLoadMoreHandler.bind(this));

            this._footerLeftElement.appendChild(this._loadMoreElement);
            this._footerRightElement = document.createElement('div');
            this._footerRightElement.className = 'right-info';
            this._rowCUItTextNode = document.createTextNode('');
            this._rowEndTextNode = document.createTextNode('');
            this._rowTotalTextNode = document.createTextNode('');
            this._footerRightElement.appendChild(document.createTextNode('Row '));
            this._footerRightElement.appendChild(this._rowCUItTextNode);
            this._footerRightElement.appendChild(document.createTextNode(' - '));
            this._footerRightElement.appendChild(this._rowEndTextNode);
            this._footerRightElement.appendChild(document.createTextNode(' of '));
            this._footerRightElement.appendChild(this._rowTotalTextNode);

            this._footerElement.appendChild(this._footerLeftElement);
            this._footerElement.appendChild(this._footerRightElement);
        }

        /**
         * 設定header排序className
         */
        protected setHeaderColumnSort() {
            let colConfig: IGridColumnConfig<T>, hElement: HTMLElement;
            let sort: string;
            let column;
            for (let i in this._config.rowColumns) {
                column = this._config.rowColumns[i];
                if (!column) {
                    continue;
                }
                colConfig = GridBuilder.buildColumnConfig(column);
                hElement = this._headerElements[i];
                sort = this._sorts[colConfig.value];
                if (sort) {
                    if (sort.toUpperCase() == Sort.Desc) {
                        hElement.classList.remove(ClassName.Asc);
                        hElement.classList.add(ClassName.Desc);
                    } else {
                        hElement.classList.remove(ClassName.Desc);
                        hElement.classList.add(ClassName.Asc);
                    }
                } else {
                    hElement.classList.remove(ClassName.Desc);
                    hElement.classList.remove(ClassName.Asc);
                }
            }
        }


        /**
         * 設定底頁資訊
         */
        protected setFooterPageInfo() {
            let endRow = (this._page.number + 1) * this._page.size;
            if (this._page.totalElements <= endRow) {
                endRow = this._page.totalElements;
                this._loadMoreElement.innerText = '';
            } else {
                this._loadMoreElement.innerText = '載入更多';
            }
            this._rowCUItTextNode.data = String(1);
            this._rowEndTextNode.data = String(endRow);
            this._rowTotalTextNode.data = String(this._page.totalElements);
        }


        /**
         * 將資料載入到 tbody
         */
        protected loadTbody(records: T[], tbodyAppendChild, clean: boolean) {
            if (!records) {
                return;
            }
            let tbody: DocumentFragment = document.createDocumentFragment();
            let length = this._page.numberOfElements;
            if (length > 0) {
                let startRow, endRow;
                // 真分頁
                if (this._realPage) {
                    startRow = 0;
                    endRow = length;
                } else {
                    startRow = this._count;
                    endRow = startRow + length;
                }
                let record;
                let colSpan = this._headerElements.length;
                for (let i = startRow; i < endRow; i++) {
                    record = records[i];
                    if (!record) {
                        continue;
                    }
                    tbodyAppendChild(tbody, i, record, colSpan);
                }
                if (this._checkedAllElement) {
                    this._checkedAllElement.checked = this._selectedRecords.length == this._count + endRow;
                    this._checkedAllText.data = '(' + this._selectedRecords.length + ')';
                }
            } else {
                tbody.appendChild(GridBuilder.buildEmptyGridRecordElement(this._columns.length));
            }
            if (clean) {
                this._tbodyElement.innerHTML = '';
            }
            this._tbodyElement.appendChild(tbody);
        }

        /**
         *
         * @param tbody
         * @param i
         * @param record
         */
        protected tbodyAppendChild = (tbody, i, record) => {
            tbody.appendChild(GridBuilder.buildGridRecordElement(this._columns, i, record));
        }

        /**
         *
         * @param tbody
         * @param i
         * @param record
         * @param colSpan
         */
        protected tbodyAppendChildContent = (tbody, i, record, colSpan) => {
            let tr = GridBuilder.buildGridRecordElement(this._columns, i, record);
            tr.addEventListener('click', onTrClick.bind(tr, this._columnContents, record, i));
            tr.classList.add(ClassName.HasContent);
            tbody.appendChild(tr);
            tbody.appendChild(GridBuilder.buildGridRecordContentElement(colSpan, this._columnContents, i, record));
        }

        /**
         * 重新設定分頁
         */
        protected resetPageable(page: IPage<T>) {
            if (page) {
                this._pageable = {
                    size: page.size,
                    page: page.number,
                    sort: this.getSortArray(),
                };
            }
        }

        /**
         * 取得排序
         */
        protected getPageSort(): IPageSort[] {
            let array: IPageSort[] = [];
            if (this._sorts) {
                for (let id in this._sorts) {
                    array.push({
                        direction: this._sorts[id],
                        property: id
                    });
                }
            }
            return array;
        }

        /**
         * 取得排序字串陣列
         */
        protected getSortArray(): string[] {
            let array = [];
            if (this._sorts) {
                for (let id in this._sorts) {
                    array.push(id + ',' + this._sorts[id]);
                }
            }
            return array;
        }

        /**
         * 設定排序
         */
        protected setSorts(config: IGridColumnConfig<T>) {
            if (config && config.sort) {
                this._defaultSorts[config.value] = config.sort;
            }
        }

        /**
         * 重新設定排序
         */
        protected updateSorts(page: IPage<T>) {
            if (page && page.sort) {
                this._sorts = {};
                let sort: IPageSort;
                for (let i in page.sort) {
                    sort = page.sort[i];
                    this._sorts[sort.property] = sort.direction;
                }
            }
        }

        /**
         * 載入更多
         */
        protected onLoadMoreHandler() {
            let startRow = (this._page.number + 1) * this._page.size;
            if (startRow <= this._page.totalElements) {
                // 考慮到之前刷新前的page index
                this._pageable.page += this._reloadPage;
                // 讀取完就重置
                this._reloadPage = 0;
                this._pageable.page++;
                this._pageable.size = this._config.size;
                this.onLoad(false);
            }
        }

        protected checkboxRender = (tr: HTMLTableRowElement, td: HTMLTableCellElement, checkbox: HTMLInputElement, record: T, index: number) => {
            this._checkboxs.push({
                tr: tr,
                td: td,
                checkbox: checkbox,
                record: record,
                index: index
            });
            td.addEventListener('click', (e: Event) => {
                e.stopPropagation();
                if (e.target == td) {
                    checkbox.checked = !checkbox.checked;
                }
                let i = this._selectedRecords.indexOf(record);
                if (checkbox.checked) {
                    if (i == -1) {
                        this._selectedRecords.push(record);
                    }
                    tr.classList.add('selected');
                } else {
                    if (i != -1) {
                        this._selectedRecords.splice(i, 1);
                    }
                    tr.classList.remove('selected');
                }
                this._checkedAllElement.checked = this._selectedRecords.length == this._count + this._page.numberOfElements;
                this._checkedAllText.data = '(' + this._selectedRecords.length + ')';
            });
            if (this._config.isSelected) {
                let checked = this._config.isSelected(null, record, index, tr);
                if (checked) {
                    tr.classList.add('selected');
                    this._selectedRecords.push(record);
                }
                return checked;
            }
            return false;
        }
    }

    export class PageGrid<T> extends Grid<T> {
        private _firstPageElement: HTMLDivElement;
        private _prevPageElement: HTMLDivElement;
        private _nextPageElement: HTMLDivElement;
        private _lastPageElement: HTMLDivElement;

        private _pageInfoElement: HTMLDivElement;
        private _pageInputElement: HTMLInputElement;
        private _pageTotalTextNode: Text;

        /**
         * 底部
         */
        protected initFooter() {
            this._footerLeftElement = document.createElement('div');
            this._footerLeftElement.className = 'left-info';
            this._firstPageElement = document.createElement('div');
            this._prevPageElement = document.createElement('div');
            this._nextPageElement = document.createElement('div');
            this._lastPageElement = document.createElement('div');

            this._pageInputElement = document.createElement('input');
            this._pageInputElement.addEventListener('keydown', this.onPageKeydown.bind(this));
            this._pageInputElement.addEventListener('blur', this.onPageBlur.bind(this));
            CUI.addListenOnEnter(this._pageInputElement, this.onPageEnter.bind(this));
            this._pageInfoElement = document.createElement('div');
            this._pageTotalTextNode = document.createTextNode('');
            this._pageInfoElement.className = ClassName.PageInfo;
            this._pageInfoElement.appendChild(document.createTextNode('Page '));
            this._pageInfoElement.appendChild(this._pageInputElement);
            this._pageInfoElement.appendChild(document.createTextNode(' of '));
            this._pageInfoElement.appendChild(this._pageTotalTextNode);

            this._firstPageElement.className = ClassName.FirstPage;
            this._prevPageElement.className = ClassName.PrevPage;
            this._nextPageElement.className = ClassName.NextPage;
            this._lastPageElement.className = ClassName.LastPage;
            this._firstPageElement.addEventListener('click', this.onFirstPageClick.bind(this));
            this._prevPageElement.addEventListener('click', this.onPrevPageClick.bind(this));
            this._nextPageElement.addEventListener('click', this.onNextPageClick.bind(this));
            this._lastPageElement.addEventListener('click', this.onLastPageClick.bind(this));

            this._footerLeftElement.appendChild(this._firstPageElement);
            this._footerLeftElement.appendChild(this._prevPageElement);
            this._footerLeftElement.appendChild(this._pageInfoElement);
            this._footerLeftElement.appendChild(this._nextPageElement);
            this._footerLeftElement.appendChild(this._lastPageElement);

            this._footerRightElement = document.createElement('div');
            this._footerRightElement.className = 'right-info';
            this._rowCUItTextNode = document.createTextNode('');
            this._rowEndTextNode = document.createTextNode('');
            this._rowTotalTextNode = document.createTextNode('');
            this._footerRightElement.appendChild(document.createTextNode('Row '));
            this._footerRightElement.appendChild(this._rowCUItTextNode);
            this._footerRightElement.appendChild(document.createTextNode(' - '));
            this._footerRightElement.appendChild(this._rowEndTextNode);
            this._footerRightElement.appendChild(document.createTextNode(' of '));
            this._footerRightElement.appendChild(this._rowTotalTextNode);

            this._footerElement.appendChild(this._footerLeftElement);
            this._footerElement.appendChild(this._footerRightElement);
        }

        protected setFooterPageInfo() {
            let page = this._page.number;
            let startRow = page * this._page.size;
            let endRow;
            if (this._page.totalElements == this._page.size) {
                endRow = startRow + this._page.size;
            } else {
                endRow = startRow + this._page.numberOfElements;
            }

            this._rowCUItTextNode.data = String(startRow + 1);
            this._rowEndTextNode.data = String(endRow);
            this._rowTotalTextNode.data = String(this._page.totalElements);
            this._pageInputElement.value = String(page + 1);
            this._pageTotalTextNode.data = String(this._page.totalPages);

            if (this._page.first) {
                this._firstPageElement.classList.add(ClassName.Disable);
                this._prevPageElement.classList.add(ClassName.Disable);
            } else {
                this._firstPageElement.classList.remove(ClassName.Disable);
                this._prevPageElement.classList.remove(ClassName.Disable);
            }
            if (this._page.last) {
                this._nextPageElement.classList.add(ClassName.Disable);
                this._lastPageElement.classList.add(ClassName.Disable);
            } else {
                this._nextPageElement.classList.remove(ClassName.Disable);
                this._lastPageElement.classList.remove(ClassName.Disable);
            }
        }

        /**
         * 刷新
         */
        public reload() {
            this.onLoad();
        }

        /**
         * 第一頁
         */
        private onFirstPageClick() {
            if (!this._page.first) {
                this._pageable.page = 0;
                this.onLoad();
            }
        }

        /**
         * 上一頁
         */
        private onPrevPageClick() {
            if (!this._page.first) {
                this._pageable.page -= 1;
                this.onLoad();
            }
        }

        /**
         * 下一頁
         */
        private onNextPageClick() {
            if (!this._page.last) {
                this._pageable.page += 1;
                this.onLoad();
            }
        }

        /**
         * 最後一頁
         */
        private onLastPageClick() {
            if (!this._page.last) {
                this._pageable.page = this._page.totalPages - 1;
                this.onLoad();
            }
        }

        /**
         * 禁止輸入非數字
         */
        private onPageKeydown(e) {
            if (e.keyCode == 8) { return; }
            return /\d/.test(e.key);
        }

        private onPageBlur(e) {
            let value = Number(this._pageInputElement.value);
            if (value < 1) {
                value = 1;
            } else if (value > this._page.totalPages) {
                value = this._page.totalPages;
            }
            this._pageInputElement.value = String(value);
        }

        /**
         * page input enter load
         */
        private onPageEnter(e) {
            let value = Number(this._pageInputElement.value);
            if (value < 1) {
                value = 1;
                this._pageInputElement.value = String(value);
            } else if (value > this._page.totalPages) {
                value = this._page.totalPages;
                this._pageInputElement.value = String(value);
            }
            value -= 1;
            if (value != this._pageable.page) {
                this._pageable.page = value;
                this.onLoad();
            }
        }
    }

    /**
     * 表頭點擊排序事件
     * Desc > Asc > 無
     * @param id
     * @param afterHandler
     * @param e
     */
    export function onHeaderClick(id, afterHandler, e) {
        let el = this as HTMLElement;
        if (el.classList.contains(ClassName.Sort)) {
            if (el.classList.contains(ClassName.Desc)) {
                el.classList.add(ClassName.Asc);
                el.classList.remove(ClassName.Desc);
                afterHandler(id, Sort.Asc);
            } else if (el.classList.contains(ClassName.Asc)) {
                el.classList.remove(ClassName.Asc);
                el.classList.remove(ClassName.Desc);
                afterHandler(id);
            } else {
                el.classList.add(ClassName.Desc);
                el.classList.remove(ClassName.Asc);
                afterHandler(id, Sort.Desc);
            }
        }
    }

    export function onTrClick(columnContents, record, i, beforeHandler, e) {
        let el = this as HTMLElement;
        let content = el.nextElementSibling as HTMLElement;
        let td = el.nextElementSibling.firstChild as HTMLElement;
        if (td.innerText == '') {
            td.appendChild(GridBuilder.loadContent(columnContents, i, record));
        }
        if (el.classList.contains(ClassName.Show)) {
            content.classList.remove(ClassName.Show);
            el.classList.remove(ClassName.Show);
        } else {
            content.classList.add(ClassName.Show);
            el.classList.add(ClassName.Show);
        }
    }

    export enum ClassName {
        Grid = 'ttb-grid',
        Container = 'ttb-grid-container',
        Header = 'ttb-grid-header',
        Body = 'ttb-grid-body',
        Footer = 'ttb-grid-footer',
        Column = 'ttb-grid-column',
        ColumnDiv = 'ttb-grid-td-div',
        Content = 'ttb-grid-content',
        Desc = 'ttb-icon-down',
        Asc = 'ttb-icon-up',
        Sort = 'sort',
        LoadMore = 'ttb-grid-load-more',
        FirstPage = 'first-page  ttb-icon-first',
        PrevPage = 'prev-page ttb-icon-prev',
        NextPage = 'next-page ttb-icon-next',
        LastPage = 'last-page ttb-icon-last',
        PageInfo = 'page-info',
        RowInfo = 'row-info',
        PageInput = 'page-input',
        Disable = 'disable',
        HasContent = 'has-content',
        Show = 'show',
    }

    /**
     * 排序列舉
     */
    export enum Sort {
        Desc = 'DESC',
        Asc = 'ASC',
    }

    export interface IExportConfig {
        tableStyle?: string;
        theadStyle?: string;
        tbodyStyle?: string;
        tdStyle?: string;
    }

    /**
     * 配置
     */
    export interface IConfig<T> {
        /**表格欄位 */
        rowColumns: IColumnConfig<T>[];
        /**更多內容欄位 */
        contentColumns?: IColumnConfig<T>[];
        /**每頁資料筆數 */
        size?: number;
        /**表格高度 */
        height?: string;
        /**表格寬度 */
        width?: string;
        index?: boolean;
        select?: boolean;
        isSelected?: IColumnRender<T>;
        /**單一欄位排序 */
        singleSort?: boolean;
        /**grid執行 load 或 reload 呼叫的方法*/
        onLoad?: IOnLoad<T>;
    }

    interface Attrs {
        [key: string]: string;
    }

    /**
     * 欄位介面
     */
    export interface IColumnConfig<T> {
        value: string;
        name: string;
        sort?: Sort;
        canSort?: boolean;
        className?: string;
        align?: string;
        width?: string;
        maxWidth?: string;
        minWidth?: string;
        nowrap?: boolean;
        html?: boolean;
        element?: boolean;
        onRender?: IColumnRender<T>;
        attrs?: Attrs;
    }

    export interface IGridColumnConfig<T> extends IColumnConfig<T> {
        checkbox?: boolean;
        click?: any;
    }

    /**
     * 欄位渲染方法介面
     */
    export type IColumnRender<T> = (value: any, record: T, index: number, tr: HTMLTableRowElement) => any;

    export interface IGridColumn<T> {
        config: IGridColumnConfig<T>;
        render: any;
    }

    export interface IGridChecbox {
        tr?: HTMLTableRowElement;
        td: HTMLTableCellElement;
        checkbox: HTMLInputElement;
        record?: any;
        index?: number;
    }

    /**
     * grid執行 load 或 reload 呼叫的方法的介面
     */
    export type IOnLoad<T = any> = (pageable: IPageable, load: ILoad<T>) => any;

    /**
     * 提供給使用者callback載入ajax返回的資料
     */
    export type ILoad<T = any> = (page: IPage<T> | T[]) => any;

    /**
     * 傳送給後端的分頁內容
     */
    export interface IPageable {
        // 每頁顯示數量
        size: number;
        // 頁碼
        page: number;
        // 排序
        sort: string[];
    }

    /**
     * 分頁資料格式
     */
    export interface IPage<T> {
        // 返回資料
        content: T[];
        // 是否第一筆
        first?: boolean;
        // 是否最後一筆
        last?: boolean;
        // 目前頁碼
        number: number;
        // 資料筆數
        numberOfElements?: number;
        // 每頁顯示筆數
        size: number;
        // 排序
        sort?: IPageSort[];
        // 總共幾筆
        totalElements?: number;
        // 總共幾頁
        totalPages?: number;
    }

    /**
     * 欄位排序格式
     */
    export interface IPageSort {
        // 排序類型
        direction: Sort;
        // 排序欄位
        property: string;
    }

    /**
     * 依定義渲染方法
     * innerHTML 渲染
     * @param onRender 定義渲染方法
     * @param value 值
     * @param record 資料
     * @param index 資料位置
     */
    export function htmlRender(onRender: IColumnRender<any>, value, record, index, tr: HTMLTableRowElement) {
        let render = onRender.call(this, value, record, index, tr);
        if (this instanceof Element) {
            (<HTMLElement>this).innerHTML = render;
        } else {
            return render;
        }
    }

    /**
     * 依定義渲染方法
     * Element appendChild
     * @param onRender 定義渲染方法
     * @param value 值
     * @param record 資料
     * @param index 資料位置
     */
    export function elementRender(onRender: IColumnRender<any>, value, record, index, tr: HTMLTableRowElement) {
        try {
            let render = onRender.call(this, value, record, index, tr);

            if (CUI.isArray(render)) {
                let el;
                for (let i in render) {
                    el = render[i];
                    if (el instanceof Element) {
                        (<HTMLElement>this).appendChild(el);
                    } else {
                        (<HTMLElement>this).innerText = el;
                        break;
                    }
                }
            } else {
                if (render instanceof Element) {
                    (<HTMLElement>this).appendChild(render);
                } else {
                    (<HTMLElement>this).innerText = render;
                }
            }
        } catch (e) {
            (<HTMLElement>this).innerText = e.message;
            console.error(e);
        }
    }

    /**
     * 依定義渲染方法
     * 純值渲染
     * @param onRender 定義渲染方法
     * @param value 值
     * @param record 資料
     * @param index 資料位置
     */
    export function textRender(onRender: IColumnRender<any>, value, record, index, tr: HTMLTableRowElement) {
        let render = onRender.call(this, value, record, index, tr);
        if (this instanceof Element) {
            (<HTMLElement>this).innerText = render;
        } else {
            return render;
        }
    }

    /**
     * 預設
     * 純值渲染
     * @param onRender 定義渲染方法
     * @param value 值
     * @param record 資料
     * @param index 資料位置
     */
    export function valueRender(onRender: IColumnRender<any>, value, record, index, tr: HTMLTableRowElement) {
        if (this instanceof Element) {
            (<HTMLElement>this).innerText = value;
        } else {
            return value;
        }
    }


    export class GridBuilder {
        private static setAttrs(element: HTMLElement, attrs: Attrs) {
            if (element && attrs) {
                for (let key in attrs) {
                    element.setAttribute(key, attrs[key]);
                }
            }
        }

        public static build<T>(config: IConfig<T>): Grid<T> {
            if (!config.rowColumns || config.rowColumns.length == 0) {
                throw new Error('rowColumns is required');
            }
            return new Grid<T>(config);
        }

        /**
         *
         * @param config 檢查
         */
        public static checkColumnConfig<T>(config: IGridColumnConfig<T>) {
            if (config.value == undefined) {
                throw new Error('column value is required');
            }
            if (config.name == undefined) {
                throw new Error('column name is required');
            }
        }

        public static buildColumnConfig<T>(config: IGridColumnConfig<T>): IGridColumnConfig<T> {
            GridBuilder.checkColumnConfig(config);
            return CUI.deepClone({
                value: '',
                name: '',
                className: '',
                sort: '',
                canSort: false,
                align: 'left',
                width: 'auto',
                nowrap: true,
                html: false,
                element: false
            }, config);
        }

        /**
         * 產生表頭
         */
        public static buildGridHeaderElement<T>(config: IGridColumnConfig<T>): HTMLElement {
            let element = document.createElement('th');
            let className = ClassName.Column + ' ' + (config.canSort ? ClassName.Sort : '');
            element.className = className;
            element.noWrap = true;
            element.align = 'center';
            element.width = config.width;
            element.innerText = config.name;
            GridBuilder.setAttrs(element, config.attrs);
            return element;
        }

        /**
         * 產生表頭
         */
        public static buildGridHeaderCheckboxElement<T>(config: IGridColumnConfig<T>): HTMLElement {
            let element = document.createElement('th');
            let className = ClassName.Column;
            element.className = className;
            element.noWrap = true;
            element.align = 'center';
            element.width = config.width;
            GridBuilder.setAttrs(element, config.attrs);
            return element;
        }

        /**
         * 產生每筆資料的 tr
         * @param columns
         * @param index
         * @param record
         */
        public static buildEmptyGridRecordElement<T>(count: number): HTMLElement {
            let tr: HTMLElement = document.createElement('tr');
            tr.className = 'empty';
            let td: HTMLTableCellElement = document.createElement('td');
            td.colSpan = count;
            td.align = 'center';
            td.innerText = '無資料';
            tr.appendChild(td);
            return tr;
        }

        /**
         * 產生每筆資料的 tr
         * @param columns
         * @param index
         * @param record
         */
        public static buildGridRecordElement<T>(columns: IGridColumn<T>[], index: number, record: T): HTMLElement {
            let tr: HTMLElement = document.createElement('tr');
            let column: IGridColumn<T>, config: IGridColumnConfig<T>, td: HTMLTableCellElement, div: HTMLElement, checkbox: HTMLInputElement;
            for (let i in columns) {
                column = columns[i];
                config = column.config;
                td = document.createElement('td');
                tr.appendChild(td);
                td.className = ClassName.Column;
                td.align = config.align;
                td.noWrap = config.nowrap;
                td.width = config.width;
                GridBuilder.setAttrs(td, config.attrs);
                if (config.checkbox) {
                    checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.className = 'checkbox';
                    td.appendChild(checkbox);
                    if (column.render) {
                        checkbox.checked = column.render(tr, td, checkbox, record, index, tr);
                    }
                } else {
                    div = document.createElement('div');
                    td.appendChild(div);
                    if (config.maxWidth) {
                        div.style.maxWidth = config.maxWidth;
                    }
                    if (config.minWidth) {
                        div.style.minWidth = config.minWidth;
                    }
                    div.className = ClassName.ColumnDiv + ' ' + config.className;
                    column.render.call(div, config.onRender, GridBuilder.getValue(config.value, record), record, index, tr);
                }
            }
            return tr;
        }

        /**
         * 產生每筆資料的 content
         * @param columns
         * @param index
         * @param record
         */
        public static buildGridRecordContentElement<T>(colSpan: number, columns: IGridColumn<T>[], index: number, record: T): HTMLElement {
            let tr: HTMLElement = document.createElement('tr');
            tr.className = ClassName.Content;
            let td = document.createElement('td');
            td.colSpan = colSpan;
            tr.appendChild(td);
            return tr;
        }

        /**
         * 延遲加載content
         * @param columns
         * @param index
         * @param record
         */
        public static loadContent<T>(columns: IGridColumn<T>[], index: number, record: T): HTMLElement {
            let table: HTMLElement = document.createElement('table');
            let column: IGridColumn<T>, config: IGridColumnConfig<T>, tr: HTMLTableRowElement, label: HTMLTableCellElement, content: HTMLTableCellElement, colon;
            for (let i in columns) {
                tr = document.createElement('tr');
                column = columns[i];
                config = column.config;
                label = document.createElement('td');
                label.align = 'left';
                label.width = '1%';
                label.noWrap = true;
                label.innerText = config.name;
                if (config.name) {
                    colon = document.createElement('span');
                    colon.innerText = '：';
                    label.appendChild(colon);
                }
                content = document.createElement('td');
                content.align = 'left';
                content.width = '100%';
                GridBuilder.setAttrs(content, config.attrs);
                tr.appendChild(label);
                tr.appendChild(content);
                table.appendChild(tr);
                column.render.call(content, config.onRender, GridBuilder.getValue(config.value, record), record, index, tr);
            }
            return table;
        }

        /**
         *
         * @param column 產生渲染方法
         */
        public static builderGridColumnRenderHandler<T>(config: IGridColumnConfig<T>): Function {
            if (config.onRender instanceof Function) {
                if (config.html) {
                    return htmlRender;
                } else if (config.element) {
                    return elementRender;
                } else {
                    return textRender;
                }
            } else {
                return valueRender;
            }
        }


        /**
         * 解析 key  ex: id.time
         * @param key
         * @param record
         */
        public static getValue(key: string, record: any) {
            if (CUI.isEmpty(key)) {
                return undefined;
            }
            let vs = key.split('.'), value = record;
            for (let i in vs) {
                value = value[vs[i]];
            }
            return value;
        }
    }

    export class PageGridBuilder extends GridBuilder {
        public static build<T>(config: IConfig<T>): PageGrid<T> {
            if (!config.rowColumns || config.rowColumns.length == 0) {
                throw new Error('rowColumns is required');
            }
            return new PageGrid<T>(config);
        }
    }
}

