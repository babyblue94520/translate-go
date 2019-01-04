/**
 * 表格
 */
export declare namespace Grid {
    /**
     * 表格
     */
    class Grid<T> {
        protected _config: IConfig<T>;
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
        protected _defaultSorts: {};
        protected _sorts: {};
        protected _pageable: IPageable;
        protected _page: IPage<T>;
        protected _realPage: boolean;
        protected _count: number;
        protected _reloadPage: number;
        protected _checkboxs: IGridChecbox[];
        protected _selectedRecords: T[];
        constructor(config: IConfig<T>);
        /**
         * 取得element
         */
        getElement(): HTMLElement;
        /**
         * 取得選取的列
         */
        getSelecteds(): T[];
        resize(height: number): void;
        initPage(): void;
        /**
         * 初始化Pageable
         */
        initPageable(): void;
        /**
         * 匯出html
         */
        export(config: IExportConfig, records: T[]): string;
        clean(): void;
        /**
         * 載入資料
         */
        load(page?: IPage<T> | T[]): void;
        /**
         * 刷新
         * 當前所有加載的資料
         */
        reload(): void;
        /**
         * 排序事件
         */
        protected onSort(id: any, sort: any): void;
        /**
         * 排序事件
         */
        protected onCheckedAll(e: any): void;
        /**
         * 載入事件
         */
        protected onLoad(clean?: boolean): void;
        /**
         *
         * @param page
         */
        protected covertPage(page: IPage<T> | T[]): IPage<T>;
        /**
         * 執行載入資料
         */
        protected doLoadPage(clean: boolean, page: IPage<T> | T[]): void;
        /**
         * 初始化grid element
         */
        protected initElement(): void;
        /**
         * 初始化表頭
         */
        protected initHeaderColumn(): void;
        /**
         * 底部
         */
        protected initFooter(): void;
        /**
         * 設定header排序className
         */
        protected setHeaderColumnSort(): void;
        /**
         * 設定底頁資訊
         */
        protected setFooterPageInfo(): void;
        /**
         * 將資料載入到 tbody
         */
        protected loadTbody(records: T[], tbodyAppendChild: any, clean: boolean): void;
        /**
         *
         * @param tbody
         * @param i
         * @param record
         */
        protected tbodyAppendChild: (tbody: any, i: any, record: any) => void;
        /**
         *
         * @param tbody
         * @param i
         * @param record
         * @param colSpan
         */
        protected tbodyAppendChildContent: (tbody: any, i: any, record: any, colSpan: any) => void;
        /**
         * 重新設定分頁
         */
        protected resetPageable(page: IPage<T>): void;
        /**
         * 取得排序
         */
        protected getPageSort(): IPageSort[];
        /**
         * 取得排序字串陣列
         */
        protected getSortArray(): string[];
        /**
         * 設定排序
         */
        protected setSorts(config: IGridColumnConfig<T>): void;
        /**
         * 重新設定排序
         */
        protected updateSorts(page: IPage<T>): void;
        /**
         * 載入更多
         */
        protected onLoadMoreHandler(): void;
        protected checkboxRender: (tr: HTMLTableRowElement, td: HTMLTableCellElement, checkbox: HTMLInputElement, record: T, index: number) => any;
    }
    class PageGrid<T> extends Grid<T> {
        private _firstPageElement;
        private _prevPageElement;
        private _nextPageElement;
        private _lastPageElement;
        private _pageInfoElement;
        private _pageInputElement;
        private _pageTotalTextNode;
        /**
         * 底部
         */
        protected initFooter(): void;
        protected setFooterPageInfo(): void;
        /**
         * 刷新
         */
        reload(): void;
        /**
         * 第一頁
         */
        private onFirstPageClick;
        /**
         * 上一頁
         */
        private onPrevPageClick;
        /**
         * 下一頁
         */
        private onNextPageClick;
        /**
         * 最後一頁
         */
        private onLastPageClick;
        /**
         * 禁止輸入非數字
         */
        private onPageKeydown;
        private onPageBlur;
        /**
         * page input enter load
         */
        private onPageEnter;
    }
    /**
     * 表頭點擊排序事件
     * Desc > Asc > 無
     * @param id
     * @param afterHandler
     * @param e
     */
    function onHeaderClick(id: any, afterHandler: any, e: any): void;
    function onTrClick(columnContents: any, record: any, i: any, beforeHandler: any, e: any): void;
    enum ClassName {
        Grid = "ttb-grid",
        Container = "ttb-grid-container",
        Header = "ttb-grid-header",
        Body = "ttb-grid-body",
        Footer = "ttb-grid-footer",
        Column = "ttb-grid-column",
        ColumnDiv = "ttb-grid-td-div",
        Content = "ttb-grid-content",
        Desc = "ttb-icon-down",
        Asc = "ttb-icon-up",
        Sort = "sort",
        LoadMore = "ttb-grid-load-more",
        FirstPage = "first-page  ttb-icon-first",
        PrevPage = "prev-page ttb-icon-prev",
        NextPage = "next-page ttb-icon-next",
        LastPage = "last-page ttb-icon-last",
        PageInfo = "page-info",
        RowInfo = "row-info",
        PageInput = "page-input",
        Disable = "disable",
        HasContent = "has-content",
        Show = "show"
    }
    /**
     * 排序列舉
     */
    enum Sort {
        Desc = "DESC",
        Asc = "ASC"
    }
    interface IExportConfig {
        tableStyle?: string;
        theadStyle?: string;
        tbodyStyle?: string;
        tdStyle?: string;
    }
    /**
     * 配置
     */
    interface IConfig<T> {
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
    interface IColumnConfig<T> {
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
    interface IGridColumnConfig<T> extends IColumnConfig<T> {
        checkbox?: boolean;
        click?: any;
    }
    /**
     * 欄位渲染方法介面
     */
    type IColumnRender<T> = (value: any, record: T, index: number, tr: HTMLTableRowElement) => any;
    interface IGridColumn<T> {
        config: IGridColumnConfig<T>;
        render: any;
    }
    interface IGridChecbox {
        tr?: HTMLTableRowElement;
        td: HTMLTableCellElement;
        checkbox: HTMLInputElement;
        record?: any;
        index?: number;
    }
    /**
     * grid執行 load 或 reload 呼叫的方法的介面
     */
    type IOnLoad<T = any> = (pageable: IPageable, load: ILoad<T>) => any;
    /**
     * 提供給使用者callback載入ajax返回的資料
     */
    type ILoad<T = any> = (page: IPage<T> | T[]) => any;
    /**
     * 傳送給後端的分頁內容
     */
    interface IPageable {
        size: number;
        page: number;
        sort: string[];
    }
    /**
     * 分頁資料格式
     */
    interface IPage<T> {
        content: T[];
        first?: boolean;
        last?: boolean;
        number: number;
        numberOfElements?: number;
        size: number;
        sort?: IPageSort[];
        totalElements?: number;
        totalPages?: number;
    }
    /**
     * 欄位排序格式
     */
    interface IPageSort {
        direction: Sort;
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
    function htmlRender(onRender: IColumnRender<any>, value: any, record: any, index: any, tr: HTMLTableRowElement): any;
    /**
     * 依定義渲染方法
     * Element appendChild
     * @param onRender 定義渲染方法
     * @param value 值
     * @param record 資料
     * @param index 資料位置
     */
    function elementRender(onRender: IColumnRender<any>, value: any, record: any, index: any, tr: HTMLTableRowElement): void;
    /**
     * 依定義渲染方法
     * 純值渲染
     * @param onRender 定義渲染方法
     * @param value 值
     * @param record 資料
     * @param index 資料位置
     */
    function textRender(onRender: IColumnRender<any>, value: any, record: any, index: any, tr: HTMLTableRowElement): any;
    /**
     * 預設
     * 純值渲染
     * @param onRender 定義渲染方法
     * @param value 值
     * @param record 資料
     * @param index 資料位置
     */
    function valueRender(onRender: IColumnRender<any>, value: any, record: any, index: any, tr: HTMLTableRowElement): any;
    class GridBuilder {
        private static setAttrs;
        static build<T>(config: IConfig<T>): Grid<T>;
        /**
         *
         * @param config 檢查
         */
        static checkColumnConfig<T>(config: IGridColumnConfig<T>): void;
        static buildColumnConfig<T>(config: IGridColumnConfig<T>): IGridColumnConfig<T>;
        /**
         * 產生表頭
         */
        static buildGridHeaderElement<T>(config: IGridColumnConfig<T>): HTMLElement;
        /**
         * 產生表頭
         */
        static buildGridHeaderCheckboxElement<T>(config: IGridColumnConfig<T>): HTMLElement;
        /**
         * 產生每筆資料的 tr
         * @param columns
         * @param index
         * @param record
         */
        static buildEmptyGridRecordElement<T>(count: number): HTMLElement;
        /**
         * 產生每筆資料的 tr
         * @param columns
         * @param index
         * @param record
         */
        static buildGridRecordElement<T>(columns: IGridColumn<T>[], index: number, record: T): HTMLElement;
        /**
         * 產生每筆資料的 content
         * @param columns
         * @param index
         * @param record
         */
        static buildGridRecordContentElement<T>(colSpan: number, columns: IGridColumn<T>[], index: number, record: T): HTMLElement;
        /**
         * 延遲加載content
         * @param columns
         * @param index
         * @param record
         */
        static loadContent<T>(columns: IGridColumn<T>[], index: number, record: T): HTMLElement;
        /**
         *
         * @param column 產生渲染方法
         */
        static builderGridColumnRenderHandler<T>(config: IGridColumnConfig<T>): Function;
        /**
         * 解析 key  ex: id.time
         * @param key
         * @param record
         */
        static getValue(key: string, record: any): any;
    }
    class PageGridBuilder extends GridBuilder {
        static build<T>(config: IConfig<T>): PageGrid<T>;
    }
}
