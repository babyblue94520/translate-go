import * as tslib_1 from "tslib";
import { CUI } from '../cui';
/**
 * 表格
 */
export var Grid;
(function (Grid_1) {
    /**
     * 表格
     */
    // tslint:disable-next-line:no-shadowed-variable
    var Grid = /** @class */ (function () {
        function Grid(config) {
            var _this = this;
            this._config = {
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
            this._defaultSorts = {};
            this._sorts = {};
            this._realPage = false;
            this._count = 0;
            this._reloadPage = 0;
            this._checkboxs = [];
            this._selectedRecords = [];
            /**
             *
             * @param tbody
             * @param i
             * @param record
             */
            this.tbodyAppendChild = function (tbody, i, record) {
                tbody.appendChild(GridBuilder.buildGridRecordElement(_this._columns, i, record));
            };
            /**
             *
             * @param tbody
             * @param i
             * @param record
             * @param colSpan
             */
            this.tbodyAppendChildContent = function (tbody, i, record, colSpan) {
                var tr = GridBuilder.buildGridRecordElement(_this._columns, i, record);
                tr.addEventListener('click', onTrClick.bind(tr, _this._columnContents, record, i));
                tr.classList.add(ClassName.HasContent);
                tbody.appendChild(tr);
                tbody.appendChild(GridBuilder.buildGridRecordContentElement(colSpan, _this._columnContents, i, record));
            };
            this.checkboxRender = function (tr, td, checkbox, record, index) {
                _this._checkboxs.push({
                    tr: tr,
                    td: td,
                    checkbox: checkbox,
                    record: record,
                    index: index
                });
                td.addEventListener('click', function (e) {
                    e.stopPropagation();
                    if (e.target == td) {
                        checkbox.checked = !checkbox.checked;
                    }
                    var i = _this._selectedRecords.indexOf(record);
                    if (checkbox.checked) {
                        if (i == -1) {
                            _this._selectedRecords.push(record);
                        }
                        tr.classList.add('selected');
                    }
                    else {
                        if (i != -1) {
                            _this._selectedRecords.splice(i, 1);
                        }
                        tr.classList.remove('selected');
                    }
                    _this._checkedAllElement.checked = _this._selectedRecords.length == _this._count + _this._page.numberOfElements;
                    _this._checkedAllText.data = '(' + _this._selectedRecords.length + ')';
                });
                if (_this._config.isSelected) {
                    var checked = _this._config.isSelected(null, record, index, tr);
                    if (checked) {
                        tr.classList.add('selected');
                        _this._selectedRecords.push(record);
                    }
                    return checked;
                }
                return false;
            };
            this._config = CUI.deepClone(this._config, config);
            // checkbox
            if (this._config.select) {
                this._config.rowColumns.splice(0, 0, {
                    checkbox: true,
                    name: '',
                    value: '',
                    width: '1%',
                    align: 'center',
                });
            }
            // 序號
            if (this._config.index) {
                this._config.rowColumns.splice(0, 0, {
                    name: '',
                    value: '',
                    width: '1%',
                    onRender: function (value, record, index) {
                        if (_this._realPage) {
                            return _this._page.number * _this._page.size + index + 1;
                        }
                        else {
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
        Grid.prototype.getElement = function () {
            return this._element;
        };
        /**
         * 取得選取的列
         */
        Grid.prototype.getSelecteds = function () {
            return this._selectedRecords;
        };
        Grid.prototype.resize = function (height) {
            this._gridElement.style.height = (height - this._gridElement.offsetTop - this._footerElement.offsetHeight - 10) + 'px';
        };
        Grid.prototype.initPage = function () {
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
        };
        /**
         * 初始化Pageable
         */
        Grid.prototype.initPageable = function () {
            this._sorts = CUI.deepClone(this._defaultSorts);
            this._pageable = {
                size: this._config.size,
                page: 0,
                sort: this.getSortArray(),
            };
            this._reloadPage = 0;
            this.setHeaderColumnSort();
        };
        /**
         * 匯出html
         */
        Grid.prototype.export = function (config, records) {
            var html = '<table style="' + (config.tableStyle || '') + '">';
            html += '<thead ><tr style="' + (config.theadStyle || '') + '">';
            var column, columnConfig;
            for (var i in this._columns) {
                column = this._columns[i];
                columnConfig = column.config;
                html += '<th align="center" nowrap width="' + columnConfig.width + '">' + columnConfig.name + '</th>';
            }
            html += '</tr></thead>';
            html += '<tbody>';
            var record;
            for (var i = 0, l = records.length; i < l; i++) {
                record = records[i];
                if (!record) {
                    continue;
                }
                html += '<tr>';
                var value = void 0;
                for (var j in this._columns) {
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
        };
        Grid.prototype.clean = function () {
            this.initPage();
            this.doLoadPage(true, this._page);
        };
        /**
         * 載入資料
         */
        Grid.prototype.load = function (page) {
            if (page) {
                this._page = this.covertPage(page);
            }
            this.initPageable();
            this.onLoad();
        };
        /**
         * 刷新
         * 當前所有加載的資料
         */
        Grid.prototype.reload = function () {
            // 計數刷新前page index
            this._reloadPage = this._pageable.page;
            // 計算總共要拉回多少資料
            this._pageable.size = this._page.number * this._page.size + this._page.numberOfElements;
            if (this._pageable.size < this._config.size) {
                this._pageable.size = this._config.size;
            }
            this._pageable.page = 0;
            this.onLoad(true);
        };
        /**
         * 排序事件
         */
        Grid.prototype.onSort = function (id, sort) {
            if (sort) {
                if (this._config.singleSort) {
                    this._sorts = {};
                }
                this._sorts[id] = sort;
            }
            else {
                delete this._sorts[id];
            }
            this._pageable.sort = this.getSortArray();
            this.onLoad();
        };
        /**
         * 排序事件
         */
        Grid.prototype.onCheckedAll = function (e) {
            if (e.target != this._checkedAllElement) {
                this._checkedAllElement.checked = !this._checkedAllElement.checked;
            }
            this._selectedRecords.length = 0;
            var gridCheckbox;
            if (this._checkedAllElement.checked) {
                for (var i in this._checkboxs) {
                    gridCheckbox = this._checkboxs[i];
                    gridCheckbox.tr.classList.add('selected');
                    gridCheckbox.checkbox.checked = true;
                    this._selectedRecords.push(gridCheckbox.record);
                }
            }
            else {
                for (var i in this._checkboxs) {
                    gridCheckbox = this._checkboxs[i];
                    gridCheckbox.tr.classList.remove('selected');
                    gridCheckbox.checkbox.checked = false;
                }
            }
            this._checkedAllText.data = '(' + this._selectedRecords.length + ')';
        };
        /**
         * 載入事件
         */
        Grid.prototype.onLoad = function (clean) {
            if (clean === void 0) { clean = true; }
            if (clean) {
                this._count = 0;
                this._selectedRecords.length = 0;
                this._checkboxs.length = 0;
            }
            else {
                this._count += this._page.numberOfElements;
            }
            if (this._config.onLoad instanceof Function) {
                this._config.onLoad(this._pageable, this.doLoadPage.bind(this, clean));
            }
            else {
                this._page.number = this._pageable.page;
                this.doLoadPage(clean, this._page);
            }
        };
        /**
         *
         * @param page
         */
        Grid.prototype.covertPage = function (page) {
            if (CUI.isArray(page)) {
                var length_1 = page.length;
                page = {
                    content: page,
                    number: this._pageable.page,
                    sort: this.getPageSort(),
                    size: this._pageable.size,
                    totalElements: length_1,
                };
                this._realPage = false;
            }
            else {
                this._realPage = true;
            }
            return page;
        };
        /**
         * 執行載入資料
         */
        Grid.prototype.doLoadPage = function (clean, page) {
            if (page) {
                page = this.covertPage(page);
                var total = page.totalElements;
                var size = page.size;
                var totalPage = Math.ceil(total == 0 ? 0 : total / size);
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
                }
                else {
                    this.loadTbody(this._page.content, this.tbodyAppendChild, clean);
                }
            }
            else {
                if (clean) {
                    this._tbodyElement.innerHTML = '';
                }
            }
            this.setFooterPageInfo();
        };
        /**
         * 初始化grid element
         */
        Grid.prototype.initElement = function () {
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
        };
        /**
         * 初始化表頭
         */
        Grid.prototype.initHeaderColumn = function () {
            this._headerElements = [];
            this._columns = [];
            var colConfig, hElement;
            var tr = document.createElement('tr');
            var column;
            for (var i in this._config.rowColumns) {
                column = this._config.rowColumns[i];
                if (!column) {
                    continue;
                }
                colConfig = GridBuilder.buildColumnConfig(column);
                if (column.checkbox) {
                    this._columns.push({
                        config: column,
                        render: this.checkboxRender
                    });
                    hElement = GridBuilder.buildGridHeaderCheckboxElement(colConfig);
                    this._checkedAllElement = document.createElement('input');
                    this._checkedAllElement.type = 'checkbox';
                    this._checkedAllElement.className = 'checkbox';
                    this._checkedAllText = document.createTextNode('');
                    hElement.appendChild(this._checkedAllElement);
                    hElement.appendChild(this._checkedAllText);
                    hElement.addEventListener('click', this.onCheckedAll.bind(this));
                }
                else {
                    this.setSorts(colConfig);
                    this._columns.push({
                        config: colConfig,
                        render: GridBuilder.builderGridColumnRenderHandler(colConfig)
                    });
                    hElement = GridBuilder.buildGridHeaderElement(colConfig);
                    hElement.addEventListener('click', onHeaderClick.bind(hElement, colConfig.value, this.onSort.bind(this)));
                }
                tr.appendChild(hElement);
                this._headerElements.push(hElement);
            }
            this._theadElement.appendChild(tr);
            this._columnContents = [];
            if (this._config.contentColumns) {
                for (var i in this._config.contentColumns) {
                    column = this._config.contentColumns[i];
                    if (!column) {
                        continue;
                    }
                    colConfig = GridBuilder.buildColumnConfig(column);
                    this._columnContents.push({
                        config: colConfig,
                        render: GridBuilder.builderGridColumnRenderHandler(colConfig)
                    });
                }
            }
        };
        /**
         * 底部
         */
        Grid.prototype.initFooter = function () {
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
        };
        /**
         * 設定header排序className
         */
        Grid.prototype.setHeaderColumnSort = function () {
            var colConfig, hElement;
            var sort;
            var column;
            for (var i in this._config.rowColumns) {
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
                    }
                    else {
                        hElement.classList.remove(ClassName.Desc);
                        hElement.classList.add(ClassName.Asc);
                    }
                }
                else {
                    hElement.classList.remove(ClassName.Desc);
                    hElement.classList.remove(ClassName.Asc);
                }
            }
        };
        /**
         * 設定底頁資訊
         */
        Grid.prototype.setFooterPageInfo = function () {
            var endRow = (this._page.number + 1) * this._page.size;
            if (this._page.totalElements <= endRow) {
                endRow = this._page.totalElements;
                this._loadMoreElement.innerText = '';
            }
            else {
                this._loadMoreElement.innerText = '載入更多';
            }
            this._rowCUItTextNode.data = String(1);
            this._rowEndTextNode.data = String(endRow);
            this._rowTotalTextNode.data = String(this._page.totalElements);
        };
        /**
         * 將資料載入到 tbody
         */
        Grid.prototype.loadTbody = function (records, tbodyAppendChild, clean) {
            if (!records) {
                return;
            }
            var tbody = document.createDocumentFragment();
            var length = this._page.numberOfElements;
            if (length > 0) {
                var startRow = void 0, endRow = void 0;
                // 真分頁
                if (this._realPage) {
                    startRow = 0;
                    endRow = length;
                }
                else {
                    startRow = this._count;
                    endRow = startRow + length;
                }
                var record = void 0;
                var colSpan = this._headerElements.length;
                for (var i = startRow; i < endRow; i++) {
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
            }
            else {
                tbody.appendChild(GridBuilder.buildEmptyGridRecordElement(this._columns.length));
            }
            if (clean) {
                this._tbodyElement.innerHTML = '';
            }
            this._tbodyElement.appendChild(tbody);
        };
        /**
         * 重新設定分頁
         */
        Grid.prototype.resetPageable = function (page) {
            if (page) {
                this._pageable = {
                    size: page.size,
                    page: page.number,
                    sort: this.getSortArray(),
                };
            }
        };
        /**
         * 取得排序
         */
        Grid.prototype.getPageSort = function () {
            var array = [];
            if (this._sorts) {
                for (var id in this._sorts) {
                    array.push({
                        direction: this._sorts[id],
                        property: id
                    });
                }
            }
            return array;
        };
        /**
         * 取得排序字串陣列
         */
        Grid.prototype.getSortArray = function () {
            var array = [];
            if (this._sorts) {
                for (var id in this._sorts) {
                    array.push(id + ',' + this._sorts[id]);
                }
            }
            return array;
        };
        /**
         * 設定排序
         */
        Grid.prototype.setSorts = function (config) {
            if (config && config.sort) {
                this._defaultSorts[config.value] = config.sort;
            }
        };
        /**
         * 重新設定排序
         */
        Grid.prototype.updateSorts = function (page) {
            if (page && page.sort) {
                this._sorts = {};
                var sort = void 0;
                for (var i in page.sort) {
                    sort = page.sort[i];
                    this._sorts[sort.property] = sort.direction;
                }
            }
        };
        /**
         * 載入更多
         */
        Grid.prototype.onLoadMoreHandler = function () {
            var startRow = (this._page.number + 1) * this._page.size;
            if (startRow <= this._page.totalElements) {
                // 考慮到之前刷新前的page index
                this._pageable.page += this._reloadPage;
                // 讀取完就重置
                this._reloadPage = 0;
                this._pageable.page++;
                this._pageable.size = this._config.size;
                this.onLoad(false);
            }
        };
        return Grid;
    }());
    Grid_1.Grid = Grid;
    var PageGrid = /** @class */ (function (_super) {
        tslib_1.__extends(PageGrid, _super);
        function PageGrid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 底部
         */
        PageGrid.prototype.initFooter = function () {
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
        };
        PageGrid.prototype.setFooterPageInfo = function () {
            var page = this._page.number;
            var startRow = page * this._page.size;
            var endRow;
            if (this._page.totalElements == this._page.size) {
                endRow = startRow + this._page.size;
            }
            else {
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
            }
            else {
                this._firstPageElement.classList.remove(ClassName.Disable);
                this._prevPageElement.classList.remove(ClassName.Disable);
            }
            if (this._page.last) {
                this._nextPageElement.classList.add(ClassName.Disable);
                this._lastPageElement.classList.add(ClassName.Disable);
            }
            else {
                this._nextPageElement.classList.remove(ClassName.Disable);
                this._lastPageElement.classList.remove(ClassName.Disable);
            }
        };
        /**
         * 刷新
         */
        PageGrid.prototype.reload = function () {
            this.onLoad();
        };
        /**
         * 第一頁
         */
        PageGrid.prototype.onFirstPageClick = function () {
            if (!this._page.first) {
                this._pageable.page = 0;
                this.onLoad();
            }
        };
        /**
         * 上一頁
         */
        PageGrid.prototype.onPrevPageClick = function () {
            if (!this._page.first) {
                this._pageable.page -= 1;
                this.onLoad();
            }
        };
        /**
         * 下一頁
         */
        PageGrid.prototype.onNextPageClick = function () {
            if (!this._page.last) {
                this._pageable.page += 1;
                this.onLoad();
            }
        };
        /**
         * 最後一頁
         */
        PageGrid.prototype.onLastPageClick = function () {
            if (!this._page.last) {
                this._pageable.page = this._page.totalPages - 1;
                this.onLoad();
            }
        };
        /**
         * 禁止輸入非數字
         */
        PageGrid.prototype.onPageKeydown = function (e) {
            if (e.keyCode == 8) {
                return;
            }
            return /\d/.test(e.key);
        };
        PageGrid.prototype.onPageBlur = function (e) {
            var value = Number(this._pageInputElement.value);
            if (value < 1) {
                value = 1;
            }
            else if (value > this._page.totalPages) {
                value = this._page.totalPages;
            }
            this._pageInputElement.value = String(value);
        };
        /**
         * page input enter load
         */
        PageGrid.prototype.onPageEnter = function (e) {
            var value = Number(this._pageInputElement.value);
            if (value < 1) {
                value = 1;
                this._pageInputElement.value = String(value);
            }
            else if (value > this._page.totalPages) {
                value = this._page.totalPages;
                this._pageInputElement.value = String(value);
            }
            value -= 1;
            if (value != this._pageable.page) {
                this._pageable.page = value;
                this.onLoad();
            }
        };
        return PageGrid;
    }(Grid));
    Grid_1.PageGrid = PageGrid;
    /**
     * 表頭點擊排序事件
     * Desc > Asc > 無
     * @param id
     * @param afterHandler
     * @param e
     */
    function onHeaderClick(id, afterHandler, e) {
        var el = this;
        if (el.classList.contains(ClassName.Sort)) {
            if (el.classList.contains(ClassName.Desc)) {
                el.classList.add(ClassName.Asc);
                el.classList.remove(ClassName.Desc);
                afterHandler(id, Sort.Asc);
            }
            else if (el.classList.contains(ClassName.Asc)) {
                el.classList.remove(ClassName.Asc);
                el.classList.remove(ClassName.Desc);
                afterHandler(id);
            }
            else {
                el.classList.add(ClassName.Desc);
                el.classList.remove(ClassName.Asc);
                afterHandler(id, Sort.Desc);
            }
        }
    }
    Grid_1.onHeaderClick = onHeaderClick;
    function onTrClick(columnContents, record, i, beforeHandler, e) {
        var el = this;
        var content = el.nextElementSibling;
        var td = el.nextElementSibling.firstChild;
        if (td.innerText == '') {
            td.appendChild(GridBuilder.loadContent(columnContents, i, record));
        }
        if (el.classList.contains(ClassName.Show)) {
            content.classList.remove(ClassName.Show);
            el.classList.remove(ClassName.Show);
        }
        else {
            content.classList.add(ClassName.Show);
            el.classList.add(ClassName.Show);
        }
    }
    Grid_1.onTrClick = onTrClick;
    var ClassName;
    (function (ClassName) {
        ClassName["Grid"] = "ttb-grid";
        ClassName["Container"] = "ttb-grid-container";
        ClassName["Header"] = "ttb-grid-header";
        ClassName["Body"] = "ttb-grid-body";
        ClassName["Footer"] = "ttb-grid-footer";
        ClassName["Column"] = "ttb-grid-column";
        ClassName["ColumnDiv"] = "ttb-grid-td-div";
        ClassName["Content"] = "ttb-grid-content";
        ClassName["Desc"] = "ttb-icon-down";
        ClassName["Asc"] = "ttb-icon-up";
        ClassName["Sort"] = "sort";
        ClassName["LoadMore"] = "ttb-grid-load-more";
        ClassName["FirstPage"] = "first-page  ttb-icon-first";
        ClassName["PrevPage"] = "prev-page ttb-icon-prev";
        ClassName["NextPage"] = "next-page ttb-icon-next";
        ClassName["LastPage"] = "last-page ttb-icon-last";
        ClassName["PageInfo"] = "page-info";
        ClassName["RowInfo"] = "row-info";
        ClassName["PageInput"] = "page-input";
        ClassName["Disable"] = "disable";
        ClassName["HasContent"] = "has-content";
        ClassName["Show"] = "show";
    })(ClassName = Grid_1.ClassName || (Grid_1.ClassName = {}));
    /**
     * 排序列舉
     */
    var Sort;
    (function (Sort) {
        Sort["Desc"] = "DESC";
        Sort["Asc"] = "ASC";
    })(Sort = Grid_1.Sort || (Grid_1.Sort = {}));
    /**
     * 依定義渲染方法
     * innerHTML 渲染
     * @param onRender 定義渲染方法
     * @param value 值
     * @param record 資料
     * @param index 資料位置
     */
    function htmlRender(onRender, value, record, index, tr) {
        var render = onRender.call(this, value, record, index, tr);
        if (this instanceof Element) {
            this.innerHTML = render;
        }
        else {
            return render;
        }
    }
    Grid_1.htmlRender = htmlRender;
    /**
     * 依定義渲染方法
     * Element appendChild
     * @param onRender 定義渲染方法
     * @param value 值
     * @param record 資料
     * @param index 資料位置
     */
    function elementRender(onRender, value, record, index, tr) {
        try {
            var render = onRender.call(this, value, record, index, tr);
            if (CUI.isArray(render)) {
                var el = void 0;
                for (var i in render) {
                    el = render[i];
                    if (el instanceof Element) {
                        this.appendChild(el);
                    }
                    else {
                        this.innerText = el;
                        break;
                    }
                }
            }
            else {
                if (render instanceof Element) {
                    this.appendChild(render);
                }
                else {
                    this.innerText = render;
                }
            }
        }
        catch (e) {
            this.innerText = e.message;
            console.error(e);
        }
    }
    Grid_1.elementRender = elementRender;
    /**
     * 依定義渲染方法
     * 純值渲染
     * @param onRender 定義渲染方法
     * @param value 值
     * @param record 資料
     * @param index 資料位置
     */
    function textRender(onRender, value, record, index, tr) {
        var render = onRender.call(this, value, record, index, tr);
        if (this instanceof Element) {
            this.innerText = render;
        }
        else {
            return render;
        }
    }
    Grid_1.textRender = textRender;
    /**
     * 預設
     * 純值渲染
     * @param onRender 定義渲染方法
     * @param value 值
     * @param record 資料
     * @param index 資料位置
     */
    function valueRender(onRender, value, record, index, tr) {
        if (this instanceof Element) {
            this.innerText = value;
        }
        else {
            return value;
        }
    }
    Grid_1.valueRender = valueRender;
    var GridBuilder = /** @class */ (function () {
        function GridBuilder() {
        }
        GridBuilder.setAttrs = function (element, attrs) {
            if (element && attrs) {
                for (var key in attrs) {
                    element.setAttribute(key, attrs[key]);
                }
            }
        };
        GridBuilder.build = function (config) {
            if (!config.rowColumns || config.rowColumns.length == 0) {
                throw new Error('rowColumns is required');
            }
            return new Grid(config);
        };
        /**
         *
         * @param config 檢查
         */
        GridBuilder.checkColumnConfig = function (config) {
            if (config.value == undefined) {
                throw new Error('column value is required');
            }
            if (config.name == undefined) {
                throw new Error('column name is required');
            }
        };
        GridBuilder.buildColumnConfig = function (config) {
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
        };
        /**
         * 產生表頭
         */
        GridBuilder.buildGridHeaderElement = function (config) {
            var element = document.createElement('th');
            var className = ClassName.Column + ' ' + (config.canSort ? ClassName.Sort : '');
            element.className = className;
            element.noWrap = true;
            element.align = 'center';
            element.width = config.width;
            element.innerText = config.name;
            GridBuilder.setAttrs(element, config.attrs);
            return element;
        };
        /**
         * 產生表頭
         */
        GridBuilder.buildGridHeaderCheckboxElement = function (config) {
            var element = document.createElement('th');
            var className = ClassName.Column;
            element.className = className;
            element.noWrap = true;
            element.align = 'center';
            element.width = config.width;
            GridBuilder.setAttrs(element, config.attrs);
            return element;
        };
        /**
         * 產生每筆資料的 tr
         * @param columns
         * @param index
         * @param record
         */
        GridBuilder.buildEmptyGridRecordElement = function (count) {
            var tr = document.createElement('tr');
            tr.className = 'empty';
            var td = document.createElement('td');
            td.colSpan = count;
            td.align = 'center';
            td.innerText = '無資料';
            tr.appendChild(td);
            return tr;
        };
        /**
         * 產生每筆資料的 tr
         * @param columns
         * @param index
         * @param record
         */
        GridBuilder.buildGridRecordElement = function (columns, index, record) {
            var tr = document.createElement('tr');
            var column, config, td, div, checkbox;
            for (var i in columns) {
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
                }
                else {
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
        };
        /**
         * 產生每筆資料的 content
         * @param columns
         * @param index
         * @param record
         */
        GridBuilder.buildGridRecordContentElement = function (colSpan, columns, index, record) {
            var tr = document.createElement('tr');
            tr.className = ClassName.Content;
            var td = document.createElement('td');
            td.colSpan = colSpan;
            tr.appendChild(td);
            return tr;
        };
        /**
         * 延遲加載content
         * @param columns
         * @param index
         * @param record
         */
        GridBuilder.loadContent = function (columns, index, record) {
            var table = document.createElement('table');
            var column, config, tr, label, content, colon;
            for (var i in columns) {
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
        };
        /**
         *
         * @param column 產生渲染方法
         */
        GridBuilder.builderGridColumnRenderHandler = function (config) {
            if (config.onRender instanceof Function) {
                if (config.html) {
                    return htmlRender;
                }
                else if (config.element) {
                    return elementRender;
                }
                else {
                    return textRender;
                }
            }
            else {
                return valueRender;
            }
        };
        /**
         * 解析 key  ex: id.time
         * @param key
         * @param record
         */
        GridBuilder.getValue = function (key, record) {
            if (CUI.isEmpty(key)) {
                return undefined;
            }
            var vs = key.split('.'), value = record;
            for (var i in vs) {
                value = value[vs[i]];
            }
            return value;
        };
        return GridBuilder;
    }());
    Grid_1.GridBuilder = GridBuilder;
    var PageGridBuilder = /** @class */ (function (_super) {
        tslib_1.__extends(PageGridBuilder, _super);
        function PageGridBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PageGridBuilder.build = function (config) {
            if (!config.rowColumns || config.rowColumns.length == 0) {
                throw new Error('rowColumns is required');
            }
            return new PageGrid(config);
        };
        return PageGridBuilder;
    }(GridBuilder));
    Grid_1.PageGridBuilder = PageGridBuilder;
})(Grid || (Grid = {}));
//# sourceMappingURL=grid.js.map