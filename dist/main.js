"use strict";
(self["webpackChunktranslate_go"] = self["webpackChunktranslate_go"] || []).push([["main"],{

/***/ 355:
/*!*****************************************************************!*\
  !*** ./src/app/app-common/component/dialog/dialog.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DialogComponent: () => (/* binding */ DialogComponent)
/* harmony export */ });
/* harmony import */ var D_workspace_babyblue94520_translate_go_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _cui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cui/core */ 2518);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/portal */ 3517);






function DialogComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div")(2, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "span", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DialogComponent_ng_template_0_Template_div_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](7, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](9, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("ttb-dialog ", ctx_r0.over, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"](ctx_r0.getClassName());
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx_r0.width ? ctx_r0.width : "")("height", ctx_r0.height ? ctx_r0.height : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", ctx_r0.title, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
  }
}
const _c0 = [[["", "dialogHeader", ""]], "*", [["", "dialog-toolbar", ""]]];
const _c1 = ["[dialogHeader]", "*", "[dialog-toolbar]"];
class DialogComponent {
  constructor(cdf, injector, viewContainerRef) {
    this.cdf = cdf;
    this.injector = injector;
    this.viewContainerRef = viewContainerRef;
    this.show = false;
    this.resizeObserver = new MutationObserver(entries => {
      if (this.show) {
        this.delayAddImageOnload();
        this.resize();
      }
    });
    this.windowSize = '';
    this.windowClassName = '';
    this.title = '';
    this.over = '';
    this.overlay = new _cui_core__WEBPACK_IMPORTED_MODULE_1__.Overlay({
      zIndex: 10000,
      onOpen: this.doOpen.bind(this),
      onClose: this.doClose.bind(this)
    });
    this.onImgLoad = () => {
      this.resize();
    };
    this.onResize = () => {
      this.resize();
    };
    this.canClose = () => true;
    this.onClose = () => {};
  }
  ngOnDestroy() {
    this.destroy();
  }
  isOpen() {
    return this.show;
  }
  open() {
    if (this.show) {
      return;
    }
    this.show = true;
    this.overlay.open();
    this.delayAddImageOnload();
    this.resize();
  }
  close() {
    var _this = this;
    return (0,D_workspace_babyblue94520_translate_go_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!(yield _this.canClose())) {
        return;
      }
      _this.resizeObserver.disconnect();
      _this.onClose();
      _this.overlay.close();
    })();
  }
  /**
   * 讓overlay 呼叫的callback
  */
  doOpen() {
    this.cdf.markForCheck();
    if (!this.outlet) {
      let wrapper = this.overlay.getElement();
      this.outlet = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_3__.DomPortalOutlet(wrapper, null, this.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_2__.ApplicationRef), this.injector);
      this.outlet.attach(new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_3__.TemplatePortal(this.templateRef, this.viewContainerRef));
      this.dialogWindow = wrapper.querySelector('.ttb-dialog-window');
    }
    this.resizeObserver.observe(this.dialogWindow, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });
    this.addImageOnload();
    window.addEventListener('resize', this.onResize);
    this.delayShow();
  }
  delayAddImageOnload() {
    this.cdf.markForCheck();
    this.addImageOnload();
  }
  addImageOnload() {
    let imgs = this.dialogWindow.querySelectorAll('img');
    imgs.forEach(img => {
      img.removeEventListener('load', this.onImgLoad);
      img.addEventListener('load', this.onImgLoad);
    });
  }
  delayShow() {
    this.cdf.markForCheck();
    this.show = true;
  }
  /**
   * 讓overlay 呼叫的callback
   * 等待動畫結束後才移除物件
  */
  doClose() {
    this.show = false;
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.onResize);
  }
  /**
   * 移除物件
   */
  destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.onResize);
    if (this.outlet) {
      this.outlet.dispose();
      this.outlet = null;
    }
    if (this.overlay) {
      this.overlay.destory();
      this.overlay = null;
    }
  }
  resize() {
    this.cdf.markForCheck();
    if (this.dialogWindow) {
      this.over = this.dialogWindow.clientHeight > window.innerHeight ? 'over' : '';
    }
  }
  getClassName() {
    return `ttb-dialog-window ${this.getSizeClass()} ${this.windowClassName} ${this.show ? 'show' : ''}`;
  }
  getSizeClass() {
    switch (this.windowSize) {
      case 'small':
        return 'ttb-col-xs32-8 ttb-col-xs48-6 ttb-col-sm-4';
      case 'large':
        return 'ttb-col-xs32-12 ttb-col-xs48-10';
      case 'full':
        return 'full';
      default:
        return 'ttb-col-xs32-10 ttb-col-xs48-8 ttb-col-sm-6';
    }
  }
  static #_ = this.ɵfac = function DialogComponent_Factory(t) {
    return new (t || DialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewContainerRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: DialogComponent,
    selectors: [["app-dialog"]],
    viewQuery: function DialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.TemplateRef, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.templateRef = _t.first);
      }
    },
    inputs: {
      windowSize: "windowSize",
      windowClassName: "windowClassName",
      title: "title",
      height: "height",
      width: "width",
      canClose: "canClose",
      onClose: "onClose"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    ngContentSelectors: _c1,
    decls: 1,
    vars: 0,
    consts: [[1, "ttb-dialog-header"], [3, "innerHTML"], [1, "close", "cui-icon-close", 3, "click"], [1, "ttb-dialog-content"], [1, "ttb-dialog-toolbar"]],
    template: function DialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, DialogComponent_ng_template_0_Template, 10, 10, "ng-template");
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
    changeDetection: 0
  });
}
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_cui_core__WEBPACK_IMPORTED_MODULE_1__.Delay)(50)], DialogComponent.prototype, "delayAddImageOnload", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_cui_core__WEBPACK_IMPORTED_MODULE_1__.Delay)(100)], DialogComponent.prototype, "delayShow", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_cui_core__WEBPACK_IMPORTED_MODULE_1__.Delay)(100)], DialogComponent.prototype, "resize", null);

/***/ }),

/***/ 7182:
/*!*****************************************************************!*\
  !*** ./src/app/app-common/component/shrink/shrink.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShrinkComponent: () => (/* binding */ ShrinkComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _cui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cui/core */ 2518);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);




const _c0 = ["header"];
const _c1 = ["shrink"];
const _c2 = ["inside"];
function ShrinkComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.title);
  }
}
function ShrinkComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0);
  }
}
function ShrinkComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](0, 1);
  }
}
const _c3 = ["*", [["", "shrink-title", ""]]];
const _c4 = ["*", "[shrink-title]"];
class ShrinkComponent {
  constructor() {
    this.title = '';
    this.shadow = false;
    this.extend = false;
  }
  ngAfterViewInit() {
    this.shrink = this.shrinkRef.nativeElement;
    this.header = this.shrink.children[0];
    this.content = this.shrink.children[1];
    if (this.extend) {
      this.content.style.opacity = '1';
      this.content.style.height = 'auto';
      this.header.classList.remove('close');
    } else {
      this.content.style.opacity = '.5';
      this.content.style.height = '0px';
      this.header.classList.add('close');
    }
  }
  openOrClose() {
    if (this.extend) {
      this.close();
    } else {
      this.open();
    }
  }
  open() {
    if (!this.extend) {
      this.extend = true;
      this.header.classList.remove('close');
      this.content.style.opacity = '1';
      this.content.style.height = this.getAllHeight() + 'px';
      clearTimeout(this.timer);
      this.timer = this.asyncHeightAuto();
    }
  }
  close() {
    if (this.extend) {
      this.extend = false;
      this.header.classList.add('close');
      this.content.style.opacity = '.5';
      this.content.style.height = this.getAllHeight() + 'px';
      clearTimeout(this.timer);
      this.timer = this.asyncHeightZero();
    }
  }
  asyncHeightAuto() {
    this.content.style.height = 'auto';
  }
  asyncHeightZero() {
    this.content.style.height = '0px';
  }
  getAllHeight() {
    return this.insideRef.nativeElement.offsetHeight;
  }
  static #_ = this.ɵfac = function ShrinkComponent_Factory(t) {
    return new (t || ShrinkComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ShrinkComponent,
    selectors: [["app-shrink"]],
    viewQuery: function ShrinkComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c2, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.headerRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.shrinkRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.insideRef = _t.first);
      }
    },
    inputs: {
      title: "title",
      shadow: "shadow",
      extend: "extend"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    ngContentSelectors: _c4,
    decls: 15,
    vars: 5,
    consts: [["shrink", ""], [1, "shrink-header", 3, "click"], [1, "left"], [4, "ngIf"], [4, "ngTemplateOutlet"], [1, "right"], [1, "shrink-close", "cui-icon-up"], [1, "shrink-content"], ["content", ""], [1, "shrink-content-inside"], ["inside", ""], ["header", ""]],
    template: function ShrinkComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", null, 0)(2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ShrinkComponent_Template_div_click_2_listener() {
          return ctx.openOrClose();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ShrinkComponent_ng_container_4_Template, 2, 1, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, ShrinkComponent_ng_container_5_Template, 1, 0, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 7, 8)(10, "div", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, ShrinkComponent_ng_template_13_Template, 1, 0, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMapInterpolate1"]("shrink ", ctx.shadow ? "shrink-shadow" : "", "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", _r5);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgTemplateOutlet],
    styles: [".shrink[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 100%;\n  overflow: hidden;\n}\n.shrink.shrink-shadow[_ngcontent-%COMP%] {\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);\n  -ms-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);\n  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);\n  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);\n  -o-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);\n}\n.shrink[_ngcontent-%COMP%]   .shrink-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  padding: 10px;\n  cursor: pointer;\n}\n.shrink[_ngcontent-%COMP%]   .shrink-header.close[_ngcontent-%COMP%]   .shrink-close[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  -moz-transform: rotate(180deg);\n  -webkit-transform: rotate(180deg);\n  -o-transform: rotate(180deg);\n}\n.shrink[_ngcontent-%COMP%]   .shrink-header[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.shrink[_ngcontent-%COMP%]   .shrink-header[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.shrink[_ngcontent-%COMP%]   .shrink-close[_ngcontent-%COMP%] {\n  width: 1.5em;\n  height: 1.5em;\n  text-align: center;\n  transition: transform 0.3s ease-in-out;\n  -webkit-transition: transform 0.3s ease-in-out;\n  -moz-transition: transform 0.3s ease-in-out;\n  -o-transition: transform 0.3s ease-in-out;\n  -ms-transition: transform 0.3s ease-in-out;\n}\n.shrink[_ngcontent-%COMP%]   .shrink-content[_ngcontent-%COMP%] {\n  overflow: hidden;\n  transition: opacity 0.3s ease-in-out, height 0.3s ease-in-out;\n  -webkit-transition: opacity 0.3s ease-in-out, height 0.3s ease-in-out;\n  -moz-transition: opacity 0.3s ease-in-out, height 0.3s ease-in-out;\n  -o-transition: opacity 0.3s ease-in-out, height 0.3s ease-in-out;\n  -ms-transition: opacity 0.3s ease-in-out, height 0.3s ease-in-out;\n}\n.shrink[_ngcontent-%COMP%]   .shrink-content-inside[_ngcontent-%COMP%] {\n  float: left;\n  width: 100%;\n  padding: 0px 10px 10px 10px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLWNvbW1vbi9jb21wb25lbnQvc2hyaW5rL3Nocmluay5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2Jhc2UvX2Z1bmN0aW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtBQUFGO0FBRUU7RUNxRkEsd0NEcEZFO0VDcUZGLDRDRHJGRTtFQ3NGRiw2Q0R0RkU7RUN1RkYsZ0REdkZFO0VDd0ZGLDJDRHhGRTtBQUlKO0FBREU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7QUFHSjtBQUFNO0VDQ0oseUJBQUE7RUFDQSw2QkREeUI7RUNFekIsOEJERnlCO0VDR3pCLGlDREh5QjtFQ0l6Qiw0QkRKeUI7QUFNM0I7QUFGSTtFQUNFLE9BQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBSU47QUFESTtFQUNFLGNBQUE7QUFHTjtBQUNFO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQ0ZGLHNDREdzQjtFQ0Z0Qiw4Q0RFc0I7RUNEdEIsMkNEQ3NCO0VDQXRCLHlDQUFBO0VBQ0EsMENERHNCO0FBS3hCO0FBRkU7RUFDRSxnQkFBQTtFQ0NGLDZEQUFBO0VBQ0EscUVEREU7RUNFRixrRURGRTtFQ0dGLGdFREhFO0VDSUYsaUVESkU7QUFRSjtBQUxFO0VBQ0UsV0FBQTtFQUNBLFdBQUE7RUFDQSwyQkFBQTtBQU9KIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcImJhc2UvZnVuY3Rpb25cIjtcclxuLnNocmluayB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcblxyXG4gICYuc2hyaW5rLXNoYWRvdyB7XHJcbiAgICBAaW5jbHVkZSBib3gtc2hhZG93KDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuNSkpO1xyXG4gIH1cclxuXHJcbiAgLnNocmluay1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblxyXG4gICAgJi5jbG9zZSB7XHJcbiAgICAgIC5zaHJpbmstY2xvc2Uge1xyXG4gICAgICAgIEBpbmNsdWRlIHRyYW5zZm9ybShyb3RhdGUoMTgwZGVnKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAubGVmdCB7XHJcbiAgICAgIGZsZXg6IDE7XHJcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICB9XHJcblxyXG4gICAgLnJpZ2h0IHtcclxuICAgICAgZmxleC1zaHJpbms6IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuc2hyaW5rLWNsb3NlIHtcclxuICAgIHdpZHRoOiAxLjVlbTtcclxuICAgIGhlaWdodDogMS41ZW07XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBAaW5jbHVkZSB0cmFuc2l0aW9uKHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0KTtcclxuICB9XHJcblxyXG4gIC5zaHJpbmstY29udGVudCB7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgQGluY2x1ZGUgdHJhbnNpdGlvbnMob3BhY2l0eSAwLjNzIGVhc2UtaW4tb3V0LCBoZWlnaHQgMC4zcyBlYXNlLWluLW91dCk7XHJcbiAgfVxyXG5cclxuICAuc2hyaW5rLWNvbnRlbnQtaW5zaWRlIHtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAwcHggMTBweCAxMHB4IDEwcHg7XHJcbiAgfVxyXG59XHJcbiIsIkBtaXhpbiBrZXlmcmFtZXMoICRuYW1lKSB7XHJcbiAgQGtleWZyYW1lcyAjeyRuYW1lfSB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbiAgQC13ZWJraXQta2V5ZnJhbWVzICN7JG5hbWV9IHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxuICBALW1zLWtleWZyYW1lcyAjeyRuYW1lfSB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbiAgQC1tb3ota2V5ZnJhbWVzICN7JG5hbWV9IHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxuICBALW8ta2V5ZnJhbWVzICN7JG5hbWV9IHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIHRyYW5zZm9ybSgkdmFsdWU6dHJhbnNsYXRlKDAsIDApKSB7XHJcbiAgdHJhbnNmb3JtOiAkdmFsdWU7XHJcbiAgLW1zLXRyYW5zZm9ybTogJHZhbHVlO1xyXG4gIC1tb3otdHJhbnNmb3JtOiAkdmFsdWU7XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06ICR2YWx1ZTtcclxuICAtby10cmFuc2Zvcm06ICR2YWx1ZTtcclxufVxyXG5cclxuQG1peGluIHRyYW5zZm9ybS1zdHlsZSgkdmFsdWU6ZmxhdCkge1xyXG4gIHRyYW5zZm9ybS1zdHlsZTogJHZhbHVlO1xyXG4gIC1tcy10cmFuc2Zvcm0tc3R5bGU6ICR2YWx1ZTtcclxuICAtbW96LXRyYW5zZm9ybS1zdHlsZTogJHZhbHVlO1xyXG4gIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiAkdmFsdWU7XHJcbiAgLW8tdHJhbnNmb3JtLXN0eWxlOiAkdmFsdWU7XHJcbn1cclxuXHJcbkBtaXhpbiB0cmFuc2l0aW9uKCR2YWx1ZTphbGwgMC4zcyBlYXNlLWluLW91dCkge1xyXG4gIHRyYW5zaXRpb246ICR2YWx1ZTtcclxuICAtd2Via2l0LXRyYW5zaXRpb246ICR2YWx1ZTtcclxuICAtbW96LXRyYW5zaXRpb246ICR2YWx1ZTtcclxuICAtby10cmFuc2l0aW9uOiAkdmFsdWU7XHJcbiAgLW1zLXRyYW5zaXRpb246ICR2YWx1ZTtcclxufVxyXG5cclxuQG1peGluIHRyYW5zaXRpb25zKCR2YWx1ZS4uLikge1xyXG4gIHRyYW5zaXRpb246ICR2YWx1ZTtcclxuICAtd2Via2l0LXRyYW5zaXRpb246ICR2YWx1ZTtcclxuICAtbW96LXRyYW5zaXRpb246ICR2YWx1ZTtcclxuICAtby10cmFuc2l0aW9uOiAkdmFsdWU7XHJcbiAgLW1zLXRyYW5zaXRpb246ICR2YWx1ZTtcclxufVxyXG5cclxuQG1peGluIGJveC1zaXppbmcoJHZhbHVlOmJvcmRlci1ib3gpIHtcclxuICBib3gtc2l6aW5nOiAkdmFsdWU7XHJcbiAgLW1zLWJveC1zaXppbmc6ICR2YWx1ZTtcclxuICAtbW96LWJveC1zaXppbmc6ICR2YWx1ZTtcclxuICAtd2Via2l0LWJveC1zaXppbmc6ICR2YWx1ZTtcclxuICAtby1ib3gtc2l6aW5nOiAkdmFsdWU7XHJcbn1cclxuXHJcbkBtaXhpbiBib3gtZmxleCgkdmFsdWU6MSkge1xyXG4gIGJveC1mbGV4OiAkdmFsdWU7XHJcbiAgLW1zLWJveC1mbGV4OiAkdmFsdWU7XHJcbiAgLW1vei1ib3gtZmxleDogJHZhbHVlO1xyXG4gIC13ZWJraXQtYm94LWZsZXg6ICR2YWx1ZTtcclxuICAtby1ib3gtZmxleDogJHZhbHVlO1xyXG59XHJcblxyXG5AbWl4aW4gYmFja2dyb3VuZC1jbGlwKCR2YWx1ZSkge1xyXG4gIGJhY2tncm91bmQtY2xpcDogJHZhbHVlO1xyXG4gIC1tcy1iYWNrZ3JvdW5kLWNsaXA6ICR2YWx1ZTtcclxuICAtbW96LWJhY2tncm91bmQtY2xpcDogJHZhbHVlO1xyXG4gIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiAkdmFsdWU7XHJcbiAgLW8tYmFja2dyb3VuZC1jbGlwOiAkdmFsdWU7XHJcbn1cclxuXHJcbkBtaXhpbiB1c2VyLXNlbGVjdCgkdmFsdWUpIHtcclxuICB1c2VyLXNlbGVjdDogJHZhbHVlO1xyXG4gIC1tcy11c2VyLXNlbGVjdDogJHZhbHVlO1xyXG4gIC1tb3otdXNlci1zZWxlY3Q6ICR2YWx1ZTtcclxuICAtd2Via2l0LXVzZXItc2VsZWN0OiAkdmFsdWU7XHJcbiAgLW8tdXNlci1zZWxlY3Q6ICR2YWx1ZTtcclxufVxyXG5cclxuQG1peGluIHBvaW50ZXItZXZlbnRzKCR2YWx1ZSkge1xyXG4gIHBvaW50ZXItZXZlbnRzOiAkdmFsdWU7XHJcbiAgLW1zLXBvaW50ZXItZXZlbnRzOiAkdmFsdWU7XHJcbiAgLW1vei1wb2ludGVyLWV2ZW50czogJHZhbHVlO1xyXG4gIC13ZWJraXQtcG9pbnRlci1ldmVudHM6ICR2YWx1ZTtcclxuICAtby1wb2ludGVyLWV2ZW50czogJHZhbHVlO1xyXG59XHJcblxyXG5AbWl4aW4gYm94LXNoYWRvdygkdmFsdWUuLi4pIHtcclxuICBib3gtc2hhZG93OiAkdmFsdWU7XHJcbiAgLW1zLWJveC1zaGFkb3c6ICR2YWx1ZTtcclxuICAtbW96LWJveC1zaGFkb3c6ICR2YWx1ZTtcclxuICAtd2Via2l0LWJveC1zaGFkb3c6ICR2YWx1ZTtcclxuICAtby1ib3gtc2hhZG93OiAkdmFsdWU7XHJcbn1cclxuXHJcbkBtaXhpbiBib3JkZXItcmFkaXVzKCR2YWx1ZS4uLikge1xyXG4gIGJvcmRlci1yYWRpdXM6ICR2YWx1ZTtcclxuICAtbXMtYm9yZGVyLXJhZGl1czogJHZhbHVlO1xyXG4gIC1tb3otYm9yZGVyLXJhZGl1czogJHZhbHVlO1xyXG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogJHZhbHVlO1xyXG4gIC1vLWJvcmRlci1yYWRpdXM6ICR2YWx1ZTtcclxufVxyXG5cclxuQG1peGluIGFwcGVhcmFuY2UoJHZhbHVlOm5vbmUpIHtcclxuICBhcHBlYXJhbmNlOiAkdmFsdWU7XHJcbiAgLW1vei1hcHBlYXJhbmNlOiAkdmFsdWU7XHJcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiAkdmFsdWU7XHJcbiAgLW8tYXBwZWFyYW5jZTogJHZhbHVlO1xyXG4gIC1tcy1hcHBlYXJhbmNlOiAkdmFsdWU7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5lYXItZ3JhZGllbnQoJGRpcmVjdGlvbiwgJGNvbG9yLXN0b3BzLi4uKSB7XHJcbiAgYmFja2dyb3VuZDogbnRoKG50aCgkY29sb3Itc3RvcHMsIDEpLCAxKTtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoJGRpcmVjdGlvbiwgJGNvbG9yLXN0b3BzKTtcclxuICBiYWNrZ3JvdW5kOiAtbXMtbGluZWFyLWdyYWRpZW50KCRkaXJlY3Rpb24sICRjb2xvci1zdG9wcyk7XHJcbiAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQoJGRpcmVjdGlvbiwgJGNvbG9yLXN0b3BzKTtcclxuICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCgkZGlyZWN0aW9uLCAkY29sb3Itc3RvcHMpO1xyXG4gIGJhY2tncm91bmQ6IC1vLWxpbmVhci1ncmFkaWVudCgkZGlyZWN0aW9uLCAkY29sb3Itc3RvcHMpO1xyXG59XHJcblxyXG5AbWl4aW4gd3JpdGluZy1tb2RlKCR2YWx1ZSkge1xyXG4gIC13ZWJraXQtd3JpdGluZy1tb2RlOiAkdmFsdWU7XHJcbiAgd3JpdGluZy1tb2RlOiAkdmFsdWU7XHJcbn1cclxuXHJcbkBtaXhpbiBhbmltYXRpb24oJHZhbHVlKSB7XHJcbiAgYW5pbWF0aW9uOiAkdmFsdWU7XHJcbiAgLW1vei1hbmltYXRpb246ICR2YWx1ZTtcclxuICAtd2Via2l0LWFuaW1hdGlvbjogJHZhbHVlO1xyXG4gIC1vLWFuaW1hdGlvbjogJHZhbHVlO1xyXG4gIC1tcy1hbmltYXRpb246ICR2YWx1ZTtcclxufVxyXG5cclxuQG1peGluIGFuaW1hdGlvbi1wbGF5LXN0YXRlKCR2YWx1ZSkge1xyXG4gIGFuaW1hdGlvbi1wbGF5LXN0YXRlOiAkdmFsdWU7XHJcbiAgLW1vei1hbmltYXRpb24tcGxheS1zdGF0ZTogJHZhbHVlO1xyXG4gIC13ZWJraXQtYW5pbWF0aW9uLXBsYXktc3RhdGU6ICR2YWx1ZTtcclxuICAtby1hbmltYXRpb24tcGxheS1zdGF0ZTogJHZhbHVlO1xyXG4gIC1tcy1hbmltYXRpb24tcGxheS1zdGF0ZTogJHZhbHVlO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    changeDetection: 0
  });
}
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_cui_core__WEBPACK_IMPORTED_MODULE_0__.Async)(300)], ShrinkComponent.prototype, "asyncHeightAuto", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_cui_core__WEBPACK_IMPORTED_MODULE_0__.Async)(0)], ShrinkComponent.prototype, "asyncHeightZero", null);

/***/ }),

/***/ 8934:
/*!****************************************************************************!*\
  !*** ./src/app/app-common/component/tabs/tab-group/tab-group.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TabGroupComponent: () => (/* binding */ TabGroupComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts/lib/cui/core/decorators/delay */ 150);
/* harmony import */ var _tab_tab_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tab/tab.component */ 5430);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);





const _c0 = ["labels"];
function TabGroupComponent_div_7_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tab_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", tab_r2.label, " ");
  }
}
function TabGroupComponent_div_7_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function TabGroupComponent_div_7_ng_container_4_Template_span_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      const i_r3 = ctx_r9.index;
      const tab_r2 = ctx_r9.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](tab_r2.doClose(i_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
}
function TabGroupComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", null, 8)(2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function TabGroupComponent_div_7_Template_div_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12);
      const i_r3 = restoredCtx.index;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r11.active(i_r3));
    })("touchstart", function TabGroupComponent_div_7_Template_div_touchstart_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12);
      const i_r3 = restoredCtx.index;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r13.active(i_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, TabGroupComponent_div_7_ng_container_3_Template, 2, 1, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, TabGroupComponent_div_7_ng_container_4_Template, 2, 0, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"](ctx_r0.getLabelClass(tab_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", tab_r2.label)("ngIfElse", tab_r2.labelRef);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", tab_r2.canClose());
  }
}
function TabGroupComponent_div_10_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
  }
}
function TabGroupComponent_div_10_ng_container_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
  }
}
function TabGroupComponent_div_10_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, TabGroupComponent_div_10_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, TabGroupComponent_div_10_ng_container_1_ng_container_2_Template, 1, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tab_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", tab_r14.templateRef);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", tab_r14.contentRef);
  }
}
function TabGroupComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, TabGroupComponent_div_10_ng_container_1_Template, 3, 2, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tab_r14 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"](ctx_r1.getContentClass(tab_r14));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", tab_r14.active);
  }
}
class TabGroupComponent {
  constructor(elementRef, cdf) {
    this.elementRef = elementRef;
    this.cdf = cdf;
    this.leftIndex = 0;
    this.labelsLeft = 0;
    this.resize = (0,ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_0__.toDelayFn)(() => {
      this.cdf.markForCheck();
      this.showPrevNext();
    }, 300);
  }
  ngAfterViewInit() {
    let element = this.elementRef.nativeElement;
    this.header = element.querySelector('.ttb-tab-header');
    this.hoverBar = element.querySelector('.ttb-tab-header-hover');
    this.labels = element.querySelector('.ttb-tab-labels');
    this.contents = element.querySelector('.ttb-tab-contents');
    this.prev = element.querySelector('.ttb-tab-prev');
    this.prev.addEventListener('click', this.prevClick.bind(this));
    this.next = element.querySelector('.ttb-tab-next');
    this.next.addEventListener('click', this.nextClick.bind(this));
    window.addEventListener('resize', this.resize);
    this.initActiveIndex();
    this.active();
    this.hover();
    this.showPrevNext();
    this.tabsRef.changes.subscribe(() => {
      if (this.tabsRef.length) {
        this.initActiveIndex();
        this.active();
      } else {
        this.contentClear();
      }
    });
    this.labelsRef.changes.subscribe(() => {
      if (this.labelsRef.length) {
        this.hover();
        this.showPrevNext();
      } else {
        this.headerClear();
      }
    });
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.resize);
  }
  getLabelClass(tab) {
    return `ttb-tab-label ${tab.active ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`;
  }
  getContentClass(tab) {
    return `ttb-tab-content ${tab.active ? 'active' : ''}`;
  }
  headerClear() {
    if (this.labels) {
      this.labels.style.transform = '';
    }
    if (this.hoverBar) {
      this.hoverBar.style.width = '0px';
      this.hoverBar.style.transform = '';
    }
  }
  contentClear() {
    if (this.contents) {
      this.contents.style.transform = '';
    }
  }
  initActiveIndex() {
    if (this.activeIndex != undefined) {
      return;
    }
    if (!this.tabsRef) {
      return;
    }
    this.activeIndex = 0;
    this.tabsRef.forEach((tab, i) => {
      if (tab.active) {
        this.activeIndex = i;
      }
    });
  }
  active(index = this.activeIndex) {
    this.cdf.markForCheck();
    if (!this.tabsRef) {
      return;
    }
    if (isNaN(index) || index < 0) {
      index = 0;
    } else if (index >= this.tabsRef.length) {
      index = this.tabsRef.length - 1;
    }
    let tab = this.tabsRef.get(index);
    if (!tab || tab.disabled) return;
    this.activeIndex = index;
    this.tabsRef.forEach((tab, i) => {
      tab.active = index == i;
    });
    tab.doActive(index);
    this.contents.style.transform = `translateX(-${index * 100}%)`;
  }
  showPrevNext() {
    if (!this.labels) return;
    this.prev.style.display = 'none';
    this.next.style.display = 'none';
    if (this.labels.offsetWidth > this.header.offsetWidth) {
      if (this.labelsLeft != 0) {
        this.prev.style.display = '';
      }
      if (this.header.offsetWidth + this.labelsLeft < this.labels.offsetWidth) {
        this.next.style.display = '';
      }
    } else {
      this.labelsLeft = 0;
      this.labels.style.transform = 'translateX(0px)';
      this.hover();
    }
  }
  prevClick() {
    if (this.leftIndex != 0) {
      let label = this.labelsRef.get(--this.leftIndex);
      if (this.leftIndex == 0) {
        this.labelsLeft = 0;
      } else {
        this.labelsLeft -= label.nativeElement.offsetWidth;
      }
      this.labels.style.transform = `translateX(-${this.labelsLeft}px)`;
      this.hover();
    }
    this.showPrevNext();
  }
  nextClick() {
    if (this.header.offsetWidth + this.labelsLeft < this.labels.offsetWidth && this.leftIndex < this.labelsRef.length - 1) {
      let label = this.labelsRef.get(this.leftIndex++);
      this.labelsLeft += label.nativeElement.offsetWidth;
      this.labels.style.transform = `translateX(-${this.labelsLeft}px)`;
      this.hover();
    }
    this.showPrevNext();
  }
  hover(index = this.activeIndex) {
    if (!this.labelsRef) return;
    let label = this.labelsRef.get(index);
    if (!label) return;
    let left = 0;
    this.labelsRef.forEach((value, i) => {
      if (i <= index) {
        left += value.nativeElement.offsetWidth;
      }
    });
    this.hoverBar.style.width = label.nativeElement.offsetWidth + 'px';
    this.hoverBar.style.transform = `translateX(${left - this.labelsLeft}px)`;
  }
  static #_ = this.ɵfac = function TabGroupComponent_Factory(t) {
    return new (t || TabGroupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: TabGroupComponent,
    selectors: [["app-tab-group"]],
    contentQueries: function TabGroupComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵcontentQuery"](dirIndex, _tab_tab_component__WEBPACK_IMPORTED_MODULE_1__.TabComponent, 4);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.tabsRef = _t);
      }
    },
    viewQuery: function TabGroupComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.labelsRef = _t);
      }
    },
    inputs: {
      activeIndex: "activeIndex"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 11,
    vars: 2,
    consts: [[1, "ttb-tab-header"], [1, "ttb-tab-header-hover"], [1, "ttb-tab-prev"], [1, "ttb-tab-next"], [1, "ttb-tab-labels"], [3, "class", 4, "ngFor", "ngForOf"], [1, "ttb-tab-body"], [1, "ttb-tab-contents"], ["labels", ""], [1, "ttb-tab-label-text", 3, "click", "touchstart"], [4, "ngIf", "ngIfElse"], [4, "ngIf"], [1, "ttb-tab-label-close", 3, "click"], [4, "ngTemplateOutlet"]],
    template: function TabGroupComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "\u3008");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u3009");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, TabGroupComponent_div_7_Template, 5, 6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 6)(9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, TabGroupComponent_div_10_Template, 2, 4, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.tabsRef);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.tabsRef);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgTemplateOutlet],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_0__.Delay)(0)], TabGroupComponent.prototype, "active", null);

/***/ }),

/***/ 5430:
/*!****************************************************************!*\
  !*** ./src/app/app-common/component/tabs/tab/tab.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TabComponent: () => (/* binding */ TabComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

const _c0 = ["all"];
const _c1 = ["content"];
const _c2 = ["label"];
function TabComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
  }
}
function TabComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0, 1);
  }
}
function TabComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0, 2);
  }
}
const _c3 = ["*", [["", "tab-label", ""]], [["", "tab-content", ""]]];
const _c4 = ["*", "[tab-label]", "[tab-content]"];
class TabComponent {
  constructor() {
    this.id = '';
    this.label = '';
    this.disabled = false;
    this.active = false;
  }
  canClose() {
    return this.onClose instanceof Function;
  }
  doActive(index) {
    if (this.onActive instanceof Function) {
      this.onActive(index, this.value, this);
    }
  }
  doClose(index) {
    if (this.canClose()) {
      this.onClose(index, this.value, this);
    }
  }
  static #_ = this.ɵfac = function TabComponent_Factory(t) {
    return new (t || TabComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: TabComponent,
    selectors: [["app-tab"]],
    viewQuery: function TabComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.templateRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.contentRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.labelRef = _t.first);
      }
    },
    inputs: {
      id: "id",
      label: "label",
      disabled: "disabled",
      active: "active",
      value: "value",
      onActive: "onActive",
      onClose: "onClose"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    ngContentSelectors: _c4,
    decls: 6,
    vars: 0,
    consts: [["all", ""], ["label", ""], ["content", ""]],
    template: function TabComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, TabComponent_ng_template_0_Template, 1, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TabComponent_ng_template_2_Template, 1, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TabComponent_ng_template_4_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 6401:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var ts_translate_toolbar_key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts/translate/toolbar.key */ 1283);
/* harmony import */ var translate_go_translate_go__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! translate-go/translate-go */ 275);
/* harmony import */ var ts_translate_toolbar_sources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ts/translate/toolbar.sources */ 3230);
/* harmony import */ var _dialog_tool_view_tool_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dialog/tool-view/tool-view.component */ 8097);
/* harmony import */ var translate_go_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! translate-go/constant */ 3454);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);









function AppComponent_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_button_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r4.start());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AppComponent_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r6.stop());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AppComponent_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lang_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", lang_r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](lang_r8);
  }
}
class AppComponent {
  constructor(elementRef, zone) {
    this.elementRef = elementRef;
    this.zone = zone;
    this.ToolbarKey = ts_translate_toolbar_key__WEBPACK_IMPORTED_MODULE_0__["default"];
    this.translateGO = (0,translate_go_translate_go__WEBPACK_IMPORTED_MODULE_1__.getTranslateGO)();
    this.toolbarGroup = 'toolbar';
    this.showToolbar = true;
    this.showToolDialog = false;
    this.languages = [];
    this.onLanguageSelected = () => {
      this.translateGO.translate(this.currentLanguage);
    };
    this.currentLanguage = this.translateGO.getLanguage();
    let space = document.createElement('div');
    space.className = 'ttb-space';
    document.body.appendChild(space);
    this.translateGO.addEventListener(translate_go_constant__WEBPACK_IMPORTED_MODULE_4__.TranslateEvent.SourceChanged, () => {
      this.zone.run(() => {
        this.languages = this.translateGO.getLanguages();
      });
    });
    this.translateGO.loadAll(ts_translate_toolbar_sources__WEBPACK_IMPORTED_MODULE_2__.toolbarSources, this.toolbarGroup);
  }
  ngAfterViewInit() {
    this.translateGO.addEventListener(translate_go_constant__WEBPACK_IMPORTED_MODULE_4__.TranslateEvent.LanguageChanged, () => {
      this.zone.run(() => {
        this.currentLanguage = this.translateGO.getLanguage();
      });
    });
    this.start();
    this.openToolDialog();
  }
  ngOnDestroy() {
    this.translateGO.removeAllEventListener(this);
  }
  start() {
    this.translateGO.start();
  }
  stop() {
    this.translateGO.stop();
  }
  openOrClose(e) {
    let button = e.target;
    let toolbar = this.elementRef.nativeElement;
    if (this.showToolbar) {
      this.showToolbar = false;
      let w = toolbar.offsetWidth - button.offsetWidth - 15;
      toolbar.style.transform = `translateX(-${w}px)`;
    } else {
      this.showToolbar = true;
      toolbar.style.transform = `translateX(0px)`;
    }
  }
  openToolDialog() {
    this.viewDialog.open();
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    viewQuery: function AppComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_dialog_tool_view_tool_view_component__WEBPACK_IMPORTED_MODULE_3__.ToolViewComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.viewDialog = _t.first);
      }
    },
    inputs: {
      onSave: "onSave"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
    decls: 10,
    vars: 12,
    consts: [[1, "ttb-bar"], ["class", "ttb-button cui-icon-play", 3, "click", 4, "ngIf"], ["class", "ttb-button bg-accent cui-icon-stop", 3, "click", 4, "ngIf"], [3, "click"], [1, "ttb-bar-select", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["ocButton", ""], [3, "onSave"], [1, "ttb-button", "cui-icon-play", 3, "click"], [1, "ttb-button", "bg-accent", "cui-icon-stop", 3, "click"], [3, "value"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AppComponent_button_1_Template, 1, 0, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, AppComponent_button_2_Template, 1, 0, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_3_listener() {
          return ctx.openToolDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_select_ngModelChange_4_listener($event) {
          return ctx.currentLanguage = $event;
        })("ngModelChange", function AppComponent_Template_select_ngModelChange_4_listener() {
          return ctx.onLanguageSelected();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, AppComponent_option_5_Template, 2, 2, "option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "button", 3, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_6_listener($event) {
          return ctx.openOrClose($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "tool-view", 7);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.translateGO.isScanning());
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.translateGO.isScanning());
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassMapInterpolate1"]("ttb-button cui-icon-edit ", ctx.showToolDialog ? "bg-dark" : "", "");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.currentLanguage);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.languages);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassMapInterpolate1"]("ttb-button small ", ctx.showToolbar ? "bg-dark" : "", "");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx.showToolbar ? "\u2716" : "\u2771", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("onSave", ctx.onSave);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgFor, _dialog_tool_view_tool_view_component__WEBPACK_IMPORTED_MODULE_3__.ToolViewComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 3446:
/*!*********************************************************************!*\
  !*** ./src/app/dialog/download-dialog/download-dialog.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DownloadDialogComponent: () => (/* binding */ DownloadDialogComponent)
/* harmony export */ });
/* harmony import */ var ts_translate_toolbar_key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts/translate/toolbar.key */ 1283);
/* harmony import */ var _cui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cui/core */ 2518);
/* harmony import */ var app_app_common_component_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app-common/component/dialog/dialog.component */ 355);
/* harmony import */ var translate_go_translate_go__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! translate-go/translate-go */ 275);
/* harmony import */ var _app_common_component_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app-common/component/tabs/tab/tab.component */ 5430);
/* harmony import */ var _app_common_component_tabs_tab_group_tab_group_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../app-common/component/tabs/tab-group/tab-group.component */ 8934);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);











function DownloadDialogComponent_ng_container_2_option_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lang_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", lang_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", lang_r5, " ");
  }
}
function DownloadDialogComponent_ng_container_2_app_tab_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "app-tab")(1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "textarea", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r3.keyFile.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r3.keyFile.content);
  }
}
function DownloadDialogComponent_ng_container_2_app_tab_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "app-tab")(1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const file_r6 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", file_r6.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("innerHTML", ctx_r4.jsonToHtml(file_r6.content), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeHtml"]);
  }
}
function DownloadDialogComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 3)(2, "select", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function DownloadDialogComponent_ng_container_2_Template_select_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r7.language = $event);
    })("ngModelChange", function DownloadDialogComponent_ng_container_2_Template_select_ngModelChange_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r9.onLanguageChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, DownloadDialogComponent_ng_container_2_option_3_Template, 2, 2, "option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Language");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 6)(7, "input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function DownloadDialogComponent_ng_container_2_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r10.keyVarable = $event);
    })("ngModelChange", function DownloadDialogComponent_ng_container_2_Template_input_ngModelChange_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r11.onKeyVarableChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Key Class Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 8)(11, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function DownloadDialogComponent_ng_container_2_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r12.download());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "app-tab-group");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, DownloadDialogComponent_ng_container_2_app_tab_13_Template, 5, 2, "app-tab", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, DownloadDialogComponent_ng_container_2_app_tab_14_Template, 5, 2, "app-tab", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r1.language);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r1.languages);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r1.keyVarable);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("innerText", ctx_r1.ToolbarKey.Download);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.keyFile);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r1.languageFiles);
  }
}
class DownloadDialogComponent {
  constructor() {
    this.ToolbarKey = ts_translate_toolbar_key__WEBPACK_IMPORTED_MODULE_0__["default"];
    this.key = 'key';
    this.translateGO = (0,translate_go_translate_go__WEBPACK_IMPORTED_MODULE_3__.getTranslateGO)();
    this.languages = [];
    this.keyVarable = '';
    this.languageFiles = [];
  }
  open(group, records) {
    this.language = this.translateGO.getLanguage();
    this.languages = this.translateGO.getLanguages();
    this.group = group;
    this.records = records;
    this.keyFile = this.buildKeyFile(group);
    this.languageFiles = this.buildLanguageFiles(group);
    this.dialog.open();
  }
  onLanguageChange() {
    this.keyFile = this.buildKeyFile(this.group);
  }
  onKeyVarableChange() {
    this.keyFile = this.buildKeyFile(this.group, this.keyVarable);
  }
  jsonToHtml(json) {
    return _cui_core__WEBPACK_IMPORTED_MODULE_1__.CUI.printJson(json);
  }
  download() {
    this.doDownload(this.keyFile.name, new Blob([this.keyFile.content], {
      type: 'application/javascript'
    }));
    for (let file of this.languageFiles) {
      this.doDownload(file.name, new Blob([file.content], {
        type: 'application/javascript'
      }));
    }
  }
  doDownload(fileName, blob) {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    a = null;
  }
  buildKeyFile(group, keyVarable) {
    this.keyVarable = keyVarable || group[0].toUpperCase() + group.substring(1) + 'Key';
    let keys = [`export default class ${this.keyVarable} {`];
    let records = this.records;
    for (let record of records) {
      let value = record[this.key];
      keys.push(`  /** ${record[this.language]}*/`);
      keys.push(`  static readonly ${value} = '{${value}}';`);
    }
    keys.push('};');
    return {
      name: `${group}.key.ts`,
      language: this.key,
      content: keys.join('\n')
    };
  }
  buildLanguageFiles(group) {
    let files = [];
    let jsons = {};
    let records = this.records;
    let languages = this.languages;
    for (let record of records) {
      let value = record[this.key];
      for (let language of languages) {
        value = record[language];
        (jsons[language] || (jsons[language] = {}))[record.key] = value;
      }
    }
    for (let language of languages) {
      files.push({
        name: `${group}.${language}.json`,
        language: language,
        content: JSON.stringify(jsons[language])
      });
    }
    return files;
  }
  static #_ = this.ɵfac = function DownloadDialogComponent_Factory(t) {
    return new (t || DownloadDialogComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: DownloadDialogComponent,
    selectors: [["download-dialog"]],
    viewQuery: function DownloadDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](app_app_common_component_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_2__.DialogComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.dialog = _t.first);
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵStandaloneFeature"]],
    decls: 3,
    vars: 2,
    consts: [[3, "windowSize"], ["downloadDialog", ""], [4, "ngIf"], [1, "ttb-col-xs32-4", "ttb-field"], [3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [1, "ttb-col-xs32-8", "ttb-field"], ["type", "text", 3, "ngModel", "ngModelChange"], [1, "ttb-button-row"], [1, "ttb-button", "bg-dark", 3, "innerText", "click"], [4, "ngFor", "ngForOf"], [3, "value"], ["tab-label", ""], [2, "height", "30em", "overflow-y", "hidden"], ["readonly", "", 2, "width", "100%", "height", "100%", 3, "value"], [2, "height", "30em", "overflow-y", "auto"], [3, "innerHTML"]],
    template: function DownloadDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "app-dialog", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, DownloadDialogComponent_ng_container_2_Template, 15, 6, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("windowSize", "large");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _r0.isOpen());
      }
    },
    dependencies: [app_app_common_component_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_2__.DialogComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgFor, _app_common_component_tabs_tab_group_tab_group_component__WEBPACK_IMPORTED_MODULE_5__.TabGroupComponent, _app_common_component_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_4__.TabComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 1370:
/*!*****************************************************************!*\
  !*** ./src/app/dialog/import-dialog/import-dialog.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportDialogComponent: () => (/* binding */ ImportDialogComponent)
/* harmony export */ });
/* harmony import */ var ts_translate_toolbar_key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts/translate/toolbar.key */ 1283);
/* harmony import */ var _cui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cui/core */ 2518);
/* harmony import */ var app_app_common_component_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app-common/component/dialog/dialog.component */ 355);
/* harmony import */ var _app_common_component_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app-common/component/tabs/tab/tab.component */ 5430);
/* harmony import */ var _app_common_component_tabs_tab_group_tab_group_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app-common/component/tabs/tab-group/tab-group.component */ 8934);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);










function ImportDialogComponent_ng_container_2_app_tab_9_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "option", 17);
  }
  if (rf & 2) {
    const value_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", value_r5)("innerText", value_r5);
  }
}
function ImportDialogComponent_ng_container_2_app_tab_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-tab")(1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 12)(4, "select", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function ImportDialogComponent_ng_container_2_app_tab_9_Template_select_ngModelChange_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);
      const file_r3 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](file_r3.language = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, ImportDialogComponent_ng_container_2_app_tab_9_option_5_Template, 1, 2, "option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const file_r3 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", file_r3.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", file_r3.language);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r2.languages);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("innerHTML", ctx_r2.jsonToHtml(file_r3.content), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeHtml"]);
  }
}
function ImportDialogComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 3)(2, "input", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function ImportDialogComponent_ng_container_2_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r8.group = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "label", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 6)(5, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ImportDialogComponent_ng_container_2_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r9);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r10.selectFiles());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 8)(7, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ImportDialogComponent_ng_container_2_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r9);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r11.import());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "app-tab-group");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, ImportDialogComponent_ng_container_2_app_tab_9_Template, 8, 4, "app-tab", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r1.group);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("innerText", ctx_r1.ToolbarKey.Group);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("innerText", ctx_r1.ToolbarKey.SelectFiles);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r1.sourceFiles.length == 0)("innerText", ctx_r1.ToolbarKey.Import);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.sourceFiles);
  }
}
class ImportDialogComponent {
  constructor(cdf) {
    this.cdf = cdf;
    this.ToolbarKey = ts_translate_toolbar_key__WEBPACK_IMPORTED_MODULE_0__["default"];
    this.languages = [];
    this.sourceFiles = [];
    this.onImport = (group, files) => {};
    this.onChange = () => {
      let fileList = this.fileInput.files;
      this.sourceFiles.length = 0;
      for (let i = 0; i < fileList.length; i++) {
        let file = fileList.item(i);
        let name = file.name;
        let language = name.replace(/^(.+\.)?([^.]+)\.[^.]+$/, '$2');
        this.group = name.substring(0, name.indexOf('.'));
        let source = this.sourceFiles[i] = {
          name: name,
          language: language,
          content: ''
        };
        let reader = new FileReader();
        reader.onload = () => {
          this.cdf.markForCheck();
          source.content = reader.result;
        };
        reader.readAsText(file);
      }
    };
    this.onClose = () => {
      this.sourceFiles.length = 0;
    };
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.multiple = true;
    this.fileInput.accept = '.json';
    this.fileInput.onchange = this.onChange;
  }
  open(languages) {
    this.group = '';
    this.sourceFiles.length = 0;
    this.languages = languages;
    this.fileInput.value = '';
    this.dialog.open();
  }
  jsonToHtml(json) {
    return _cui_core__WEBPACK_IMPORTED_MODULE_1__.CUI.printJson(json);
  }
  selectFiles() {
    this.fileInput.click();
  }
  import() {
    this.onImport(this.group, this.sourceFiles);
    this.dialog.close();
  }
  static #_ = this.ɵfac = function ImportDialogComponent_Factory(t) {
    return new (t || ImportDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: ImportDialogComponent,
    selectors: [["import-dialog"]],
    viewQuery: function ImportDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](app_app_common_component_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_2__.DialogComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.dialog = _t.first);
      }
    },
    inputs: {
      onImport: "onImport"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
    decls: 3,
    vars: 3,
    consts: [[3, "windowSize", "onClose"], ["sourceDialog", ""], [4, "ngIf"], [1, "ttb-field"], ["type", "text", 3, "ngModel", "ngModelChange"], [3, "innerText"], [1, "ttb-button-row", "center"], [1, "ttb-button", 3, "innerText", "click"], [1, "ttb-button-row"], [1, "ttb-button", 3, "disabled", "innerText", "click"], [4, "ngFor", "ngForOf"], ["tab-label", ""], [1, "ttb-field", 2, "width", "10em"], [3, "ngModel", "ngModelChange"], [3, "value", "innerText", 4, "ngFor", "ngForOf"], [1, "ttb-field", 2, "height", "30em", "overflow-y", "auto"], [3, "innerHTML"], [3, "value", "innerText"]],
    template: function ImportDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-dialog", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, ImportDialogComponent_ng_container_2_Template, 10, 6, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("windowSize", "large")("onClose", ctx.onClose);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _r0.isOpen());
      }
    },
    dependencies: [app_app_common_component_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_2__.DialogComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _app_common_component_tabs_tab_group_tab_group_component__WEBPACK_IMPORTED_MODULE_4__.TabGroupComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgFor, _app_common_component_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_3__.TabComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 4087:
/*!*****************************************************************!*\
  !*** ./src/app/dialog/tool-view/tool-tab/tool-tab.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolTabComponent: () => (/* binding */ ToolTabComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var ts_util_loop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts/util/loop */ 8719);
/* harmony import */ var ts_translate_toolbar_key__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts/translate/toolbar.key */ 1283);
/* harmony import */ var ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ts/lib/cui/core/decorators/delay */ 150);
/* harmony import */ var ts_util_dom_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ts/util/dom-util */ 8651);
/* harmony import */ var app_dialog_download_dialog_download_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../download-dialog/download-dialog.component */ 3446);
/* harmony import */ var translate_go_translate_go__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! translate-go/translate-go */ 275);
/* harmony import */ var translate_go_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! translate-go/constant */ 3454);
/* harmony import */ var ts_util_sticky_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ts/util/sticky-table */ 9049);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 6575);















const _c0 = ["table"];
function ToolTabComponent_th_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "th")(1, "div")(2, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_th_30_Template_span_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);
      const language_r3 = restoredCtx.$implicit;
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r4.sortChange(language_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_th_30_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);
      const language_r3 = restoredCtx.$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r6.copy(language_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "textarea", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function ToolTabComponent_th_30_Template_textarea_ngModelChange_5_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);
      const language_r3 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r7.propertyText[language_r3] = $event);
    })("ngModelChange", function ToolTabComponent_th_30_Template_textarea_ngModelChange_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);
      const language_r3 = restoredCtx.$implicit;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r8.onTextChange(language_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const language_r3 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassMap"](ctx_r1.sortClass(language_r3));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", language_r3, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r1.propertyText[language_r3]);
  }
}
function ToolTabComponent_ng_container_33_input_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function ToolTabComponent_ng_container_33_input_7_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);
      const record_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](record_r9[ctx_r14.key] = $event);
    })("ngModelChange", function ToolTabComponent_ng_container_33_input_7_Template_input_ngModelChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r17.onRecordChange(ctx_r17.key));
    })("blur", function ToolTabComponent_ng_container_33_input_7_Template_input_blur_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r18.onBlur());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const record_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", record_r9[ctx_r12.key])("placeholder", "Please enter key");
  }
}
function ToolTabComponent_ng_container_33_td_8_textarea_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "textarea", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function ToolTabComponent_ng_container_33_td_8_textarea_3_Template_textarea_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r26);
      const language_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const record_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](record_r9[language_r20] = $event);
    })("ngModelChange", function ToolTabComponent_ng_container_33_td_8_textarea_3_Template_textarea_ngModelChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r26);
      const language_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r28.onRecordChange(language_r20));
    })("blur", function ToolTabComponent_ng_container_33_td_8_textarea_3_Template_textarea_blur_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r26);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r30.onBlur());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const language_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    const record_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", record_r9[language_r20])("ngModel", record_r9[language_r20]);
  }
}
function ToolTabComponent_ng_container_33_td_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 33, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_ng_container_33_td_8_Template_td_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r34);
      const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](1);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r33.onFocus(_r22));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, ToolTabComponent_ng_container_33_td_8_textarea_3_Template, 1, 2, "textarea", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const language_r20 = ctx.$implicit;
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](1);
    const record_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("innerText", record_r9[language_r20]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r13.isFocus(_r22));
  }
}
function ToolTabComponent_ng_container_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "tr", 23)(2, "td", 24)(3, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_ng_container_33_Template_button_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r37);
      const record_r9 = restoredCtx.$implicit;
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r36.removeSource(record_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "td", 26, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_ng_container_33_Template_td_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r37);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](5);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r38.onFocus(_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, ToolTabComponent_ng_container_33_input_7_Template, 1, 2, "input", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, ToolTabComponent_ng_container_33_td_8_Template, 4, 2, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const record_r9 = ctx.$implicit;
    const i_r10 = ctx.index;
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](5);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", !ctx_r2.isFilter(i_r10));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassMapInterpolate1"](" ttb-grid-column ", ctx_r2.getKeyClass(record_r9[ctx_r2.key]), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("innerText", record_r9[ctx_r2.key]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.isFocus(_r11));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r2._languages);
  }
}
class ToolTabComponent {
  set languages(languages) {
    this._languages = languages;
    this.init();
  }
  constructor(cdf, zone) {
    this.cdf = cdf;
    this.zone = zone;
    this.ToolbarKey = ts_translate_toolbar_key__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.key = 'key';
    this.split = '\n----------------\n';
    this.translateGO = (0,translate_go_translate_go__WEBPACK_IMPORTED_MODULE_5__.getTranslateGO)();
    this._languages = [];
    this.group = '';
    this.records = [];
    this.keyCount = {};
    this.orderBy = {
      name: this.key,
      sort: translate_go_constant__WEBPACK_IMPORTED_MODULE_6__.Sort.ASC
    };
    this.originRecords = [];
    this.newLanguage = 'zh-TW';
    this.newLanguageMessage = '';
    this.newGroup = 'New';
    this.keyword = '';
    this.filterRecords = [];
    this.filterCount = 0;
    this.propertyText = {};
    this.changes = {};
    this.onChange = _ => {};
    this.onTouched = () => {};
  }
  ngAfterViewInit() {
    this.translateGO.addEventListener(translate_go_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateEvent.SourceChanged, () => {
      this.zone.run(() => {
        this.init();
      });
    });
    this.stickyTable = new ts_util_sticky_table__WEBPACK_IMPORTED_MODULE_7__.StickyTable(this.tableRef.nativeElement, {
      head: {
        cols: 2
      },
      body: {
        cols: 2
      }
    });
  }
  ngOnDestroy() {
    this.translateGO.removeAllEventListener(this);
  }
  writeValue(value) {
    this.cdf.markForCheck();
    this.value = value;
    this.group = value;
    this.init();
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  isFocus(element) {
    return this.focus == element;
  }
  onFocus(element) {
    if (this.focus == element) return;
    this.focus = element;
    this.focusEditor();
  }
  onBlur() {
    this.focus = undefined;
  }
  focusEditor() {
    if (this.focus) {
      let editor = this.focus.querySelector('input,textarea');
      if (editor) {
        editor.focus();
        editor.select();
      }
    }
  }
  rename() {
    this.onChange(this.value);
    this.onTouched();
    this.translateGO.loadAll(this.translateGO.getLanguageSource(this.group), this.value);
    this.translateGO.removeLanguageSource(this.group);
  }
  isGroupChange() {
    return this.value != this.group;
  }
  save() {
    if (this.onSave instanceof Function) {
      this.onSave(this.getChanges());
    } else {
      let records = this.records;
      let sources = {};
      for (let record of records) {
        for (let language of this._languages) {
          (sources[language] || (sources[language] = {}))[record.key] = record[language];
        }
      }
      for (let language in sources) {
        this.translateGO.load(language, sources[language], this.group);
      }
      this.init();
    }
  }
  openDownload() {
    this.downloadDialog.open(this.group, this.records);
  }
  getKeyClass(key) {
    return (this.keyCount[key] || 0) > 1 ? 'duplicate' : '';
  }
  filter() {
    this.cdf.markForCheck();
    ts_util_loop__WEBPACK_IMPORTED_MODULE_0__["default"].of(this.records).call(loop => this.addFilterHandler(loop)).call(loop => this.addUpdateAllTextHandler(loop)).run();
  }
  isFilter(i) {
    return this.filterRecords[i];
  }
  sortClass(name) {
    if (this.orderBy.name == name) {
      return 'pointer ' + (this.orderBy.sort == translate_go_constant__WEBPACK_IMPORTED_MODULE_6__.Sort.DESC ? 'cui-icon-down' : 'cui-icon-up');
    } else {
      return 'pointer';
    }
  }
  sortChange(name) {
    this.orderBy.name = name;
    this.orderBy.sort *= -1;
    this.records.sort((a, b) => {
      return (a[name] || '').localeCompare(b[name]) * this.orderBy.sort;
    });
    this.originRecords.sort((a, b) => {
      return (a[name] || '').localeCompare(b[name]) * this.orderBy.sort;
    });
    ts_util_loop__WEBPACK_IMPORTED_MODULE_0__["default"].of(this.records).call(loop => this.addUpdateAllTextHandler(loop)).run();
  }
  onRecordChange(name) {
    this.cdf.markForCheck();
    ts_util_loop__WEBPACK_IMPORTED_MODULE_0__["default"].of(this.records).call(loop => {
      if (name == this.key) {
        this.addKeyCountHandler(loop);
      }
    }).call(loop => this.addUpdateTextHandler(name, loop)).call(loop => this.addChangeHandler(name, loop)).run();
  }
  onTextChange(name) {
    this.cdf.markForCheck();
    let text = this.propertyText[name] || '';
    if (!text.trim()) {
      return;
    }
    let messages = text.split(/\n-{10,}\n/);
    ts_util_loop__WEBPACK_IMPORTED_MODULE_0__["default"].of(this.records).handler((record, i) => {
      record[name] = messages[i];
    }).call(loop => {
      if (name == this.key) {
        this.addKeyCountHandler(loop);
      }
    }).call(loop => this.addChangeHandler(name, loop)).run();
  }
  addSource() {
    this.records.unshift(this.buildRecord());
    ts_util_loop__WEBPACK_IMPORTED_MODULE_0__["default"].of(this.records).call(loop => this.addFilterHandler(loop)).call(loop => this.addUpdateAllTextHandler(loop)).call(loop => this.addAllChangeHandler(loop)).after(() => {
      this.filterCount++;
      this.filterRecords[0] = true;
    }).run();
  }
  removeSource(record) {
    let records = this.records;
    let index = records.indexOf(record);
    if (index == -1) {
      return;
    }
    records.splice(index, 1);
    ts_util_loop__WEBPACK_IMPORTED_MODULE_0__["default"].of(this.records).call(loop => this.addFilterHandler(loop)).call(loop => this.addUpdateAllTextHandler(loop)).call(loop => this.addAllChangeHandler(loop)).run();
  }
  copy(name) {
    ts_util_dom_util__WEBPACK_IMPORTED_MODULE_3__.DomUtil.copyText(this.propertyText[name]);
  }
  isChange() {
    for (let name in this.changes) {
      if (this.changes[name]) return true;
    }
    return false;
  }
  init() {
    this.cdf.markForCheck();
    let records = this.originRecords = [];
    let keyRecord = {};
    let languageSource = this.translateGO.getLanguageSource(this.group) || {};
    if (languageSource) {
      for (let language of this._languages) {
        let source = languageSource[language];
        if (!source) continue;
        for (let key in source) {
          let record = keyRecord[key];
          if (!record) {
            records.push(record = keyRecord[key] = this.buildRecord());
            record.key = key;
          }
          record[language] = this.getMessageOrKey(source, key);
        }
      }
    }
    this.reset();
  }
  reset() {
    this.records.length = this.originRecords.length;
    ts_util_loop__WEBPACK_IMPORTED_MODULE_0__["default"].of(this.originRecords).handler((record, i) => {
      this.records[i] = Object.assign(this.buildRecord(), record);
    }).run();
    ts_util_loop__WEBPACK_IMPORTED_MODULE_0__["default"].of(this.records).call(loop => this.addFilterHandler(loop)).call(loop => this.addKeyCountHandler(loop)).call(loop => this.addUpdateAllTextHandler(loop)).call(loop => this.addAllChangeHandler(loop)).run();
  }
  addFilterHandler(loop) {
    let keyword = this.keyword.toLowerCase();
    loop.before(array => {
      this.filterCount = array.length;
      this.filterRecords.length = array.length;
      this.filterRecords.fill(true);
    });
    if (keyword) {
      loop.handler((record, i) => {
        for (let name in record) {
          let value = (record[name] || '').toLowerCase();
          if (value.indexOf(keyword) > -1) {
            return;
          }
        }
        this.filterCount--;
        this.filterRecords[i] = false;
      });
    }
  }
  addKeyCountHandler(loop) {
    this.keyCount = {};
    loop.handler(record => {
      this.keyCount[record.key] = (this.keyCount[record.key] || 0) + 1;
    });
  }
  addChangeHandler(name, loop) {
    let change = false;
    loop.handler((record, i) => {
      let origin = this.originRecords[i];
      if (!origin || record[name] != origin[name]) {
        change = true;
        return true;
      }
    }).after(() => {
      this.changes[name] = change;
    });
  }
  addUpdateTextHandler(name, loop) {
    let text = '';
    loop.handler((record, i) => {
      if (this.isFilter(i)) {
        text += this.split + record[name];
      }
    }).after(() => {
      this.propertyText[name] = text.substring(this.split.length);
    });
  }
  addAllChangeHandler(loop) {
    for (let name in this.propertyText) {
      this.addChangeHandler(name, loop);
    }
  }
  addUpdateAllTextHandler(loop) {
    let texts = this.propertyText = {};
    texts[this.key] = '';
    for (let language of this._languages) {
      texts[language] = '';
    }
    for (let name in this.propertyText) {
      this.addUpdateTextHandler(name, loop);
    }
  }
  buildRecord() {
    let record = {
      key: ''
    };
    this._languages.forEach(language => {
      this.getMessageOrKey(record, language);
    });
    return record;
  }
  getMessageOrKey(record, name) {
    if (record[name] == undefined || record[name] == '') {
      record[name] = record.key ? '!key@' + record.key : '';
    }
    return record[name];
  }
  getChanges() {
    let changes = {
      change: false,
      adds: [],
      modifies: [],
      removes: []
    };
    let removeMap = this.toMap(this.originRecords);
    let records = this.records;
    for (let record of records) {
      let key = record[this.key];
      for (let language of this._languages) {
        let value = record[language];
        let index = this.toIndex(key, language);
        let obj = removeMap[index];
        removeMap[index] = undefined;
        if (obj) {
          if (obj.message != value) {
            changes.modifies.push(this.buildTranslate(key, language, value));
          }
        } else {
          changes.adds.push(this.buildTranslate(key, language, value));
        }
      }
    }
    for (let key in removeMap) {
      let data = removeMap[key];
      if (data) {
        changes.removes.push(data);
      }
    }
    changes.change = changes.adds.length > 0 || changes.modifies.length > 0 || changes.removes.length > 0;
    return changes;
  }
  toMap(array) {
    let map = {};
    array.forEach((record, i) => {
      for (let name in record) {
        if (name == this.key) continue;
        map[this.toIndex(record.key, name)] = this.buildTranslate(record.key, name, record[name]);
      }
    });
    return map;
  }
  buildTranslate(key = '', language = '', message = '') {
    return {
      group: this.group,
      key: key,
      language: language,
      message: message
    };
  }
  toIndex(key, language) {
    return key + '-' + language;
  }
  static #_ = this.ɵfac = function ToolTabComponent_Factory(t) {
    return new (t || ToolTabComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: ToolTabComponent,
    selectors: [["tool-tab"]],
    viewQuery: function ToolTabComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](app_dialog_download_dialog_download_dialog_component__WEBPACK_IMPORTED_MODULE_4__.DownloadDialogComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.downloadDialog = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.tableRef = _t.first);
      }
    },
    inputs: {
      languages: "languages",
      onSave: "onSave"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵProvidersFeature"]([{
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NG_VALUE_ACCESSOR,
      useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.forwardRef)(() => ToolTabComponent),
      multi: true
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵStandaloneFeature"]],
    decls: 35,
    vars: 18,
    consts: [[1, "view"], [1, "ttb-flex-row"], [1, "ttb-field"], [1, "ttb-button", "small", "cui-icon-ok", 3, "disabled", "click"], ["type", "text", 3, "ngModel", "ngModelChange"], [3, "innerText"], ["type", "text", 3, "ngModel", "disabled", "ngModelChange"], [1, "ttb-button-row", "center"], [1, "ttb-button", 3, "disabled", "innerText", "click"], [1, "ttb-button", "bg-dark", 3, "innerText", "click"], [1, "ttb-button", "bg-dark", 3, "disabled", "innerText", "click"], [1, "view-content"], [1, "ttb-grid"], [1, "ttb-grid-container"], ["table", ""], [1, "button", "ttb-button", "cui-icon-add", 3, "click"], [1, "nowrap"], [3, "click"], [1, "ttb-button", "none", "small", "cui-icon-copy", 3, "click"], [3, "ngModel", "ngModelChange"], [4, "ngFor", "ngForOf"], ["notTranslate", ""], [1, "ttb-button", "small", "none", "cui-icon-copy", 3, "click"], [3, "hidden"], ["align", "left", "nowrap", "", "width", "1%", 1, "ttb-grid-column"], [1, "button", "ttb-button", "none", "small", "cui-icon-remove", 3, "click"], ["align", "left", "nowrap", "", "width", "1%", 3, "click"], ["td", ""], [1, "text", 3, "innerText"], ["class", "editor", "required", "", 3, "ngModel", "placeholder", "ngModelChange", "blur", 4, "ngIf"], ["nowrap", "", "width", "1%", "class", "ttb-grid-column", "align", "left", 3, "click", 4, "ngFor", "ngForOf"], ["width", "100%"], ["required", "", 1, "editor", 3, "ngModel", "placeholder", "ngModelChange", "blur"], ["nowrap", "", "width", "1%", "align", "left", 1, "ttb-grid-column", 3, "click"], ["class", "editor", "required", "", "autofocus", "", 3, "value", "ngModel", "ngModelChange", "blur", 4, "ngIf"], ["required", "", "autofocus", "", 1, "editor", 3, "value", "ngModel", "ngModelChange", "blur"]],
    template: function ToolTabComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_Template_button_click_3_listener() {
          return ctx.rename();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function ToolTabComponent_Template_input_ngModelChange_4_listener($event) {
          return ctx.value = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 2)(7, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function ToolTabComponent_Template_input_ngModelChange_7_listener($event) {
          return ctx.keyword = $event;
        })("ngModelChange", function ToolTabComponent_Template_input_ngModelChange_7_listener() {
          return ctx.filter();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 7)(10, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_Template_button_click_10_listener() {
          return ctx.save();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_Template_button_click_11_listener() {
          return ctx.openDownload();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_Template_button_click_12_listener() {
          return ctx.reset();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "div", 11)(16, "div", 12)(17, "div", 13)(18, "table", null, 14)(20, "thead")(21, "tr")(22, "th")(23, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_Template_button_click_23_listener() {
          return ctx.addSource();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "th")(25, "div", 16)(26, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_Template_span_click_26_listener() {
          return ctx.sortChange(ctx.key);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](27, "Key");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](28, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ToolTabComponent_Template_button_click_28_listener() {
          return ctx.copy(ctx.key);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](29, "textarea", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function ToolTabComponent_Template_textarea_ngModelChange_29_listener($event) {
          return ctx.propertyText[ctx.key] = $event;
        })("ngModelChange", function ToolTabComponent_Template_textarea_ngModelChange_29_listener() {
          return ctx.onTextChange(ctx.key);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](30, ToolTabComponent_th_30_Template, 6, 4, "th", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](31, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](32, "tbody", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](33, ToolTabComponent_ng_container_33_Template, 10, 7, "ng-container", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](34, "download-dialog");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.isGroupChange());
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("innerText", ctx.ToolbarKey.Group);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.keyword)("disabled", ctx.isChange());
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("innerText", ctx.ToolbarKey.Keyword);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.isChange())("innerText", "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("innerText", ctx.ToolbarKey.Download);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.isChange())("innerText", "reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("count: ", ctx.filterCount, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("nottranslate", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassMap"](ctx.sortClass(ctx.key));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.propertyText[ctx.key]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx._languages);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.records);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgFor, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, app_dialog_download_dialog_download_dialog_component__WEBPACK_IMPORTED_MODULE_4__.DownloadDialogComponent],
    styles: ["th[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\ntbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #eee;\n}\n\ntd[_ngcontent-%COMP%] {\n  position: relative;\n  align-items: center;\n}\ntd[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {\n  display: flex;\n  width: 20em;\n  overflow: hidden;\n  word-break: break-word;\n  white-space: normal;\n}\ntd[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]:empty {\n  min-height: 2em;\n  border: 1px solid #ff4081;\n}\ntd[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  padding: inherit;\n  border: none;\n  resize: none;\n}\ntd[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]:focus {\n  border: 1px solid #2196f3;\n}\n\n.view[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  padding: 5px;\n  overflow: hidden;\n}\n.view[_ngcontent-%COMP%]   .view-content[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex: 1;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  word-break: break-word;\n}\n\n.ttb-button[_ngcontent-%COMP%]::before {\n  padding-right: 0px;\n}\n\n.duplicate[_ngcontent-%COMP%] {\n  color: #ff4081;\n}\n\n.pointer[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGlhbG9nL3Rvb2wtdmlldy90b29sLXRhYi90b29sLXRhYi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLFdBQUE7QUFBSjs7QUFLRTtFQUNFLDZCQUFBO0FBRko7O0FBTUE7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FBSEY7QUFLRTtFQUNFLGFBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBSEo7QUFLSTtFQUNFLGVBQUE7RUFDQSx5QkFBQTtBQUhOO0FBT0U7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQUxKO0FBTUk7RUFDRSx5QkFBQTtBQUpOOztBQVNBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQU5GO0FBUUU7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0Esc0JBQUE7QUFOSjs7QUFVQTtFQUNFLGtCQUFBO0FBUEY7O0FBVUE7RUFDRSxjQUFBO0FBUEY7O0FBVUE7RUFDRSxlQUFBO0FBUEYiLCJzb3VyY2VzQ29udGVudCI6WyJ0aCB7XHJcbiAgdGV4dGFyZWEge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG59XHJcblxyXG50Ym9keSB7XHJcbiAgdHIge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XHJcbiAgfVxyXG59XHJcblxyXG50ZCB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gIC50ZXh0IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICB3aWR0aDogMjBlbTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcclxuXHJcbiAgICAmOmVtcHR5IHtcclxuICAgICAgbWluLWhlaWdodDogMmVtO1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZmY0MDgxO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmVkaXRvciB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDBweDtcclxuICAgIGxlZnQ6IDBweDtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHBhZGRpbmc6IGluaGVyaXQ7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICByZXNpemU6IG5vbmU7XHJcbiAgICAmOmZvY3VzIHtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzIxOTZmMztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi52aWV3IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG5cclxuICAudmlldy1jb250ZW50IHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XHJcbiAgfVxyXG59XHJcblxyXG4udHRiLWJ1dHRvbjo6YmVmb3JlIHtcclxuICBwYWRkaW5nLXJpZ2h0OiAwcHg7XHJcbn1cclxuXHJcbi5kdXBsaWNhdGUge1xyXG4gIGNvbG9yOiAjZmY0MDgxO1xyXG59XHJcblxyXG4ucG9pbnRlciB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}
(0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_2__.Delay)()], ToolTabComponent.prototype, "focusEditor", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_2__.Delay)(50)], ToolTabComponent.prototype, "filter", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_2__.Delay)(200)], ToolTabComponent.prototype, "onRecordChange", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_2__.Delay)(200)], ToolTabComponent.prototype, "onTextChange", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_2__.Delay)(50)], ToolTabComponent.prototype, "init", null);

/***/ }),

/***/ 8097:
/*!*********************************************************!*\
  !*** ./src/app/dialog/tool-view/tool-view.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolViewComponent: () => (/* binding */ ToolViewComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var ts_translate_toolbar_key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts/translate/toolbar.key */ 1283);
/* harmony import */ var ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts/lib/cui/core/decorators/delay */ 150);
/* harmony import */ var app_app_common_component_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app-common/component/dialog/dialog.component */ 355);
/* harmony import */ var translate_go_translate_go__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! translate-go/translate-go */ 275);
/* harmony import */ var _import_dialog_import_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../import-dialog/import-dialog.component */ 1370);
/* harmony import */ var app_app_common_component_tabs_tab_group_tab_group_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../app-common/component/tabs/tab-group/tab-group.component */ 8934);
/* harmony import */ var ts_lib_cui_core_decorators_took_time__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ts/lib/cui/core/decorators/took-time */ 2122);
/* harmony import */ var translate_go_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! translate-go/constant */ 3454);
/* harmony import */ var _tool_tab_tool_tab_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tool-tab/tool-tab.component */ 4087);
/* harmony import */ var _app_common_component_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../app-common/component/tabs/tab/tab.component */ 5430);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _app_common_component_shrink_shrink_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../app-common/component/shrink/shrink.component */ 7182);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 1699);


















function ToolViewComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 17)(1, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function ToolViewComponent_div_16_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5);
      const language_r3 = restoredCtx.$implicit;
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r4.removeLanguage(language_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const language_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", language_r3, " ");
  }
}
function ToolViewComponent_app_tab_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "app-tab", 19)(1, "div", 20)(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "tool-tab", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function ToolViewComponent_app_tab_28_Template_tool_tab_ngModelChange_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r9);
      const i_r7 = restoredCtx.index;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r8.groups[i_r7] = $event);
    })("ngModelChange", function ToolViewComponent_app_tab_28_Template_tool_tab_ngModelChange_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r9);
      const i_r7 = restoredCtx.index;
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r10.onGroupChange(ctx_r10.groups[i_r7]));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const group_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("onClose", ctx_r2.onGroupClose)("value", group_r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", group_r6, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r2.groups[i_r7])("languages", ctx_r2.languages)("onSave", ctx_r2.onSave);
  }
}
class ToolViewComponent {
  constructor(cdf, zone) {
    this.cdf = cdf;
    this.zone = zone;
    this.ToolbarKey = ts_translate_toolbar_key__WEBPACK_IMPORTED_MODULE_0__["default"];
    this.translateGO = (0,translate_go_translate_go__WEBPACK_IMPORTED_MODULE_3__.getTranslateGO)();
    this.newLanguage = 'zh-TW';
    this.newLanguageMessage = '';
    this.newGroup = 'New';
    this.languages = [];
    this.groups = [];
    this.prepardActiveGroup = '';
    this.activeTab = (0,ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_1__.toDelayFn)(index => {
      this.cdf.markForCheck();
      if (this.tabGroup) {
        this.tabGroup.active(index);
      }
    });
    this.onGroupClose = (index, group) => {
      this.removeGroup(group);
    };
    this.importSource = (0,ts_lib_cui_core_decorators_took_time__WEBPACK_IMPORTED_MODULE_6__.toTookTimeFn)((group, sourceFiles) => {
      this.prepardActiveGroup = group;
      for (let file of sourceFiles) {
        this.translateGO.load(file.language, JSON.parse(file.content), group);
      }
    });
  }
  ngAfterViewInit() {
    this.translateGO.addEventListener(translate_go_constant__WEBPACK_IMPORTED_MODULE_7__.TranslateEvent.SourceChanged, () => {
      if (this.dialog.isOpen()) {
        this.zone.run(() => {
          this.init();
        });
      }
    });
  }
  ngOnDestroy() {
    this.translateGO.removeAllEventListener(this);
  }
  open() {
    this.init();
    this.dialog.open();
  }
  isDisableLanguageButton() {
    return !this.newLanguage || this.languages.indexOf(this.newLanguage) != -1;
  }
  addLanguage() {
    let language = this.newLanguage,
      languages = this.languages;
    if (!language || languages.indexOf(language) > -1) {
      return;
    }
    this.languages = [language, ...languages];
  }
  removeLanguage(language) {
    let languages = this.languages;
    let index = languages.indexOf(language);
    if (index == -1) return;
    if (!window.confirm(`${this.translateGO.get('{SureDelete}')} '${language}'?`)) {
      return;
    }
    languages.splice(index, 1);
  }
  isDisableGroupButton() {
    return !this.newGroup;
  }
  addGroup() {
    let group = this.newGroup;
    if (this.groups.indexOf(group) != -1) {
      alert(group + ' does exist!');
      return;
    }
    this.groups.unshift(this.newGroup);
    this.activeTab(0);
  }
  onGroupChange(group) {
    this.prepardActiveGroup = group;
  }
  removeGroup(group) {
    if (!window.confirm(`${this.translateGO.get('{SureDelete}')} '${group}'?`)) {
      return;
    }
    let index = this.groups.indexOf(group);
    if (index == -1) return;
    this.translateGO.removeLanguageSource(group);
  }
  openSourceDialog() {
    this.importDialog.open(this.languages);
  }
  init() {
    this.cdf.markForCheck();
    let groups = this.translateGO.getGroups();
    this.groups.length = 0;
    for (let i in groups) {
      this.groups[i] = groups[i];
    }
    this.languages = this.translateGO.getLanguages();
    if (this.prepardActiveGroup) {
      this.activeTab(this.groups.indexOf(this.prepardActiveGroup));
      this.prepardActiveGroup = undefined;
    }
  }
  static #_ = this.ɵfac = function ToolViewComponent_Factory(t) {
    return new (t || ToolViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.NgZone));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
    type: ToolViewComponent,
    selectors: [["tool-view"]],
    viewQuery: function ToolViewComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](app_app_common_component_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_2__.DialogComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](app_app_common_component_tabs_tab_group_tab_group_component__WEBPACK_IMPORTED_MODULE_5__.TabGroupComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_import_dialog_import_dialog_component__WEBPACK_IMPORTED_MODULE_4__.ImportDialogComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.dialog = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.tabGroup = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.importDialog = _t.first);
      }
    },
    inputs: {
      onSave: "onSave"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵStandaloneFeature"]],
    decls: 30,
    vars: 13,
    consts: [[3, "windowSize"], ["sourceDialog", ""], [1, "ttb-tool", "view"], ["shrink-title", "", 3, "innerText"], [1, "ttb-flex-row"], [1, "ttb-flex-shrink"], [1, "ttb-button", "cui-icon-add", 3, "disabled", "click"], [2, "width", "10em"], [1, "ttb-field"], ["type", "text", 3, "ngModel", "ngModelChange"], [3, "innerText"], [1, "error-message"], ["class", "ttb-flex-block", 4, "ngFor", "ngForOf"], [1, "ttb-button", 3, "innerText", "click"], [1, "view-content", "column"], [3, "onClose", "value", 4, "ngFor", "ngForOf"], [3, "onImport"], [1, "ttb-flex-block"], [1, "ttb-button", "none", "small", "cui-icon-remove", 3, "click"], [3, "onClose", "value"], ["tab-label", ""], [3, "ngModel", "languages", "onSave", "ngModelChange"]],
    template: function ToolViewComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "app-dialog", 0, 1)(2, "div", 2)(3, "app-shrink");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 4)(6, "div", 5)(7, "div")(8, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function ToolViewComponent_Template_button_click_8_listener() {
          return ctx.addLanguage();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 7)(10, "div", 8)(11, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function ToolViewComponent_Template_input_ngModelChange_11_listener($event) {
          return ctx.newLanguage = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](12, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](15, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](16, ToolViewComponent_div_16_Template, 3, 1, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "div", 4)(18, "div", 5)(19, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function ToolViewComponent_Template_button_click_19_listener() {
          return ctx.addGroup();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](20, "div")(21, "div", 8)(22, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function ToolViewComponent_Template_input_ngModelChange_22_listener($event) {
          return ctx.newGroup = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](23, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](24, "div", 4)(25, "div", 5)(26, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function ToolViewComponent_Template_button_click_26_listener() {
          return ctx.openSourceDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](27, "app-tab-group", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](28, ToolViewComponent_app_tab_28_Template, 5, 6, "app-tab", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](29, "import-dialog", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("windowSize", "full");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("innerText", ctx.ToolbarKey.Settings);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx.isDisableLanguageButton());
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx.newLanguage);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("innerText", ctx.ToolbarKey.Language);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx.newLanguageMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx.languages);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx.isDisableGroupButton());
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx.newGroup);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("innerText", ctx.ToolbarKey.Group);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("innerText", ctx.ToolbarKey.Import);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx.groups);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("onImport", ctx.importSource);
      }
    },
    dependencies: [app_app_common_component_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_2__.DialogComponent, _app_common_component_shrink_shrink_component__WEBPACK_IMPORTED_MODULE_10__.ShrinkComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgFor, app_app_common_component_tabs_tab_group_tab_group_component__WEBPACK_IMPORTED_MODULE_5__.TabGroupComponent, _app_common_component_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_9__.TabComponent, _tool_tab_tool_tab_component__WEBPACK_IMPORTED_MODULE_8__.ToolTabComponent, _import_dialog_import_dialog_component__WEBPACK_IMPORTED_MODULE_4__.ImportDialogComponent],
    styles: [".view[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  padding: 5px;\n  overflow: hidden;\n}\n.view[_ngcontent-%COMP%]   .view-content[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex: 1;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  word-break: break-word;\n}\n.view[_ngcontent-%COMP%]   .view-content.column[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGlhbG9nL3Rvb2wtdmlldy90b29sLXZpZXcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBQ0Y7QUFDRTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxzQkFBQTtBQUNKO0FBQ0k7RUFDRSxzQkFBQTtBQUNOIiwic291cmNlc0NvbnRlbnQiOlsiLnZpZXcge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgcGFkZGluZzogNXB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcblxyXG4gIC52aWV3LWNvbnRlbnQge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXg6IDE7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgd29yZC1icmVhazogYnJlYWstd29yZDtcclxuXHJcbiAgICAmLmNvbHVtbiB7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}
(0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([(0,ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_1__.Delay)(50), ts_lib_cui_core_decorators_took_time__WEBPACK_IMPORTED_MODULE_6__.TookTime], ToolViewComponent.prototype, "init", null);

/***/ }),

/***/ 553:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
  production: false
};

/***/ }),

/***/ 4913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_elements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/elements */ 7164);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/app.component */ 6401);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 553);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
function loadApp() {
  (0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.createApplication)({
    providers: []
  }).then(appRef => {
    // create a constructor of a custom element
    const component = (0,_angular_elements__WEBPACK_IMPORTED_MODULE_4__.createCustomElement)(app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent,
    // component for Angular element
    {
      injector: appRef.injector
    } // used to inject the component to the DOM
    );
    // register in a browser
    customElements.define('translate-toolbar', component);
  });
}
setTimeout(function () {
  if (window['Zone'] === undefined) {
    console.log('Unable to find zone, so loading one...');
    __webpack_require__.e(/*! import() */ "node_modules_zone_js_dist_zone_js").then(__webpack_require__.t.bind(__webpack_require__, /*! zone.js/dist/zone */ 9669, 23)).then(() => {
      loadApp();
    });
  } else {
    console.log('Found an existing Zone, so just reusing it');
    loadApp();
  }
}, 1000);

/***/ }),

/***/ 3454:
/*!**************************************!*\
  !*** ./src/translate-go/constant.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sort: () => (/* binding */ Sort),
/* harmony export */   TranslateConst: () => (/* binding */ TranslateConst),
/* harmony export */   TranslateEvent: () => (/* binding */ TranslateEvent)
/* harmony export */ });
var TranslateEvent;
(function (TranslateEvent) {
  TranslateEvent["SourceChanged"] = "sourceChanged";
  TranslateEvent["LanguageChanged"] = "languageChanged";
})(TranslateEvent || (TranslateEvent = {}));
var Sort;
(function (Sort) {
  Sort[Sort["ASC"] = 1] = "ASC";
  Sort[Sort["DESC"] = -1] = "DESC";
})(Sort || (Sort = {}));
const TranslateConst = {
  DefaultGroup: 'default',
  // 忽略標籤
  IgnoreTagArray: {
    'SCRIPT': true,
    'LINK': true,
    'META': true,
    'STYLE': true
  },
  // 忽略Attribute
  IgnoreAttributeName: 'nottranslate',
  // translate group attribute name
  TranslateGroup: 'translategroup',
  // translate key attribute name
  TranslateKey: 'translatekey',
  // TranslateGO 在window 中的名稱
  Prefix: '__translateGO',
  // TranslateGO 在window 中的名稱
  ConfigPrefix: '__translateConfig'
};

/***/ }),

/***/ 1392:
/*!**************************************************************!*\
  !*** ./src/translate-go/nodes/translate-node-placeholder.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TranslateNodePlaceholder)
/* harmony export */ });
/* harmony import */ var _translate_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translate-node */ 7877);

class TranslateNodePlaceholder extends _translate_node__WEBPACK_IMPORTED_MODULE_0__["default"] {
  initKey() {
    return this.node.placeholder;
  }
  setValue(text) {
    this.node.placeholder = text;
  }
  getValue() {
    return this.node.placeholder;
  }
}

/***/ }),

/***/ 7831:
/*!*********************************************************!*\
  !*** ./src/translate-go/nodes/translate-node-submit.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TranslateNodeSubmit)
/* harmony export */ });
/* harmony import */ var _translate_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translate-node */ 7877);

class TranslateNodeSubmit extends _translate_node__WEBPACK_IMPORTED_MODULE_0__["default"] {
  initKey() {
    return this.node.value;
  }
  setValue(text) {
    this.node.value = text;
  }
  getValue() {
    return this.node.value;
  }
}

/***/ }),

/***/ 7798:
/*!*******************************************************!*\
  !*** ./src/translate-go/nodes/translate-node-text.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TranslateNodeText)
/* harmony export */ });
/* harmony import */ var _translate_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translate-node */ 7877);

class TranslateNodeText extends _translate_node__WEBPACK_IMPORTED_MODULE_0__["default"] {
  initKey() {
    return this.node.childNodes?.item(this.index)?.data || '';
  }
  setValue(data) {
    if (this.index == -1) {
      this.node.innerText = data;
    } else {
      let text = this.node.childNodes.item(this.index);
      if (text) {
        if (text.nodeType == 3) {
          text.data = data;
        } else {
          this.node.replaceChild(new Text(data), text);
        }
      } else {
        this.node.insertBefore(new Text(data), this.node.childNodes.item(this.index - 1));
      }
    }
  }
  getValue() {
    return this.node.childNodes?.item(this.index)?.data || '';
  }
}

/***/ }),

/***/ 7877:
/*!**************************************************!*\
  !*** ./src/translate-go/nodes/translate-node.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TranslateNode)
/* harmony export */ });
class TranslateNode {
  constructor(translateGo, node, group, key = '', index = -1) {
    this.translateGo = translateGo;
    this.node = node;
    this.group = group;
    this.index = index;
    this.source = {};
    this.key = key ? key : this.initKey().trim();
    this.originValue = this.getValue();
  }
  getKey() {
    return this.key;
  }
  getNode() {
    return this.node.childNodes?.item(this.index) || this.node;
  }
  match() {
    return this.key != this.getTranslateText();
  }
  translate() {
    let text = this.getTranslateText();
    if (text) {
      if (this.getValue() != text) {
        this.setValue(text);
      }
    } else {
      this.setValue(this.originValue);
    }
    return text;
  }
  getTranslateText() {
    if (this.key.length == 0) {
      return this.key;
    }
    let args = {};
    for (let name of this.node.getAttributeNames()) {
      args[name] = this.node.getAttribute(name);
    }
    let language = this.translateGo.getLanguage();
    let text = this.translateGo.get(this.key, args, language, this.group);
    if (text) {
      this.source[language] = text;
    }
    return text;
  }
  alive() {
    if (this.node.isConnected) {
      return true;
    }
    return false;
  }
  destroy() {
    this.setValue(this.originValue);
  }
}

/***/ }),

/***/ 3550:
/*!******************************************!*\
  !*** ./src/translate-go/translate-db.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TranslateDB)
/* harmony export */ });
class TranslateDB {
  constructor() {
    this.keyRegexp = new RegExp('([^$]?)\{([^{}]+)}', 'g');
    this.groups = [];
    this.notFoundKeys = {};
    this.groupSource = {};
    this.cacheResult = {};
  }
  load(language, source, group) {
    let target = this.getSource(group, language);
    let cache = this.getCache(group, language);
    for (let key in source) {
      target[key] = source[key];
      cache[key] = '';
      delete this.getNotFoundSource(language)[key];
    }
    this.updateGroups();
  }
  getNotFoundKeys() {
    return this.notFoundKeys;
  }
  get(key, args = {}, language, group) {
    let text;
    if (group) {
      text = this.find(key, args, language, group);
    } else {
      text = this.findAll(key, args, language);
    }
    if (!text) {
      console.warn(key, 'translate source not found.');
    }
    return text;
  }
  getGroups() {
    return this.groups;
  }
  getGroupSource() {
    return this.groupSource;
  }
  getLanguageSource(group) {
    return this.groupSource[group];
  }
  removeLanguageSource(group) {
    delete this.groupSource[group];
    this.updateGroups();
  }
  clearCache() {
    this.cacheResult = {};
  }
  updateGroups() {
    this.groups.length = 0;
    for (let group in this.groupSource) {
      this.groups.push(group);
    }
    this.groups.sort();
  }
  findAll(key, args, language) {
    let result = key;
    for (let group in this.groupSource) {
      let result = this.find(key, args, language, group);
      if (result != key) return result;
    }
    return result;
  }
  find(key, args, language, group, prevMatchKeys = {}) {
    if (!key) {
      return key;
    }
    let cache = this.getCache(group, language);
    let result = cache[key];
    if (result) {
      return result;
    }
    if (typeof key != 'string') {
      console.warn('key must be a string.');
      return key;
    }
    let presentMatchKeys = {};
    let matchCount = 0;
    result = key.replace(this.keyRegexp, (...matchs) => {
      matchCount++;
      let match = matchs[2];
      if (!prevMatchKeys[match]) {
        let text = this.getText(match, args, language, group);
        if (text != undefined) {
          if (this.keyRegexp.test(text)) {
            presentMatchKeys[match] = true;
          }
          return matchs[1] + text;
        }
      }
      return matchs[0];
    });
    if (matchCount == 0) {
      return key;
    }
    if (this.isEmpty(presentMatchKeys)) {
      if (this.isEmpty(args)) {
        cache[key] = result;
      }
      return result;
    } else {
      for (let name in presentMatchKeys) {
        prevMatchKeys[name] = presentMatchKeys[name];
      }
      return this.find(result, args, language, group, prevMatchKeys);
    }
  }
  getText(key, args, language, group) {
    let result = args[key];
    if (result != undefined) {
      return result;
    }
    let source = this.getSource(group, language);
    result = source[key];
    if (result) {
      return result;
    } else {
      this.getNotFoundSource(language)[key] = key;
      return undefined;
    }
  }
  isEmpty(object) {
    for (let i in object) {
      return false;
    }
    return true;
  }
  getCache(group, language) {
    let temp = this.cacheResult[group] || (this.cacheResult[group] = {});
    return temp[language] || (temp[language] = {});
  }
  getSource(group, language) {
    let temp = this.groupSource[group] || (this.groupSource[group] = {});
    return temp[language] || (temp[language] = {});
  }
  getNotFoundSource(language) {
    return this.notFoundKeys[language] || (this.notFoundKeys[language] = {});
  }
}

/***/ }),

/***/ 275:
/*!******************************************!*\
  !*** ./src/translate-go/translate-go.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TranslateGO),
/* harmony export */   getTranslateGO: () => (/* binding */ getTranslateGO)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _translate_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translate-db */ 3550);
/* harmony import */ var _nodes_translate_node_placeholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodes/translate-node-placeholder */ 1392);
/* harmony import */ var _nodes_translate_node_submit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodes/translate-node-submit */ 7831);
/* harmony import */ var _nodes_translate_node_text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nodes/translate-node-text */ 7798);
/* harmony import */ var _ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ts/lib/cui/core/decorators/delay */ 150);
/* harmony import */ var _ts_lib_cui_core_listener_event_listener_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ts/lib/cui/core/listener/event-listener-container */ 9903);
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constant */ 3454);








window['getTranslateGO'] = getTranslateGO;
/**
 * 取得TranslateGO
 */
function getTranslateGO() {
  if (window[_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.Prefix]) {
    return window[_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.Prefix];
  } else {
    return window[_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.Prefix] = new TranslateGO();
  }
}
class TranslateGO {
  constructor() {
    this.listeners = new _ts_lib_cui_core_listener_event_listener_container__WEBPACK_IMPORTED_MODULE_5__.EventListenerContainer();
    this.ignoreMap = new Map();
    this.translateGroupMap = new Map();
    this.nodeMap = new Map();
    this.mutationObserver = new MutationObserver(mutations => {
      this.mutationObserverHandler(mutations);
    });
    this.db = new _translate_db__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.language = navigator.language;
    this.scanning = false;
    this.languages = [];
    this.doClearRemoveNode = () => {
      let ignoreSize = this.ignoreMap.size;
      this.ignoreMap.forEach((v, k, m) => {
        if (!k.isConnected) {
          m.delete(k);
        }
      });
      let translateSize = this.translateGroupMap.size;
      this.translateGroupMap.forEach((v, k, m) => {
        if (!k.isConnected) {
          m.delete(k);
        }
      });
      console.log('translate clear ignore size ', ignoreSize, '>', this.ignoreMap.size, ' translate size ', translateSize, '>', this.translateGroupMap.size);
    };
  }
  getLanguage() {
    return this.language;
  }
  getLanguages() {
    return this.languages;
  }
  translate(language, force = false) {
    if (!force && this.language == language) return;
    this.language = language;
    this.doTranslate(this.nodeMap, force);
    this.listeners.dispatch(_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateEvent.LanguageChanged);
  }
  load(language, source, group) {
    this.doLoad(language, source, group);
    this.doStart();
    this.listeners.dispatch(_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateEvent.SourceChanged);
  }
  loadAll(languageSource, group) {
    for (let language in languageSource) {
      this.doLoad(language, languageSource[language], group);
    }
    this.doStart();
    this.listeners.dispatch(_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateEvent.SourceChanged);
  }
  doLoad(language, source, group = _constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.DefaultGroup) {
    if (this.languages.indexOf(language) == -1) {
      this.languages.push(language);
    }
    this.db.load(language, source, group);
  }
  removeLanguageSource(group) {
    this.db.removeLanguageSource(group);
    this.listeners.dispatch(_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateEvent.SourceChanged);
  }
  clearSource() {
    this.db = new _translate_db__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.languages.length = 0;
  }
  isScanning() {
    return this.scanning;
  }
  start() {
    if (this.scanning) {
      return;
    }
    this.doStart();
  }
  stop() {
    this.removeEvents();
    this.scanning = false;
    this.clear();
  }
  addEventListener(event, callback, target) {
    this.listeners.addListener(event, callback, target);
  }
  removeEventListener(event, callback) {
    this.listeners.removeListener(event, callback);
  }
  removeAllEventListener(target) {
    this.listeners.removeAllListener(target);
  }
  get(key, args = {}, language = this.language, group) {
    return this.db.get(key, args, language, group);
  }
  getNotFoundKeys() {
    return this.db.getNotFoundKeys();
  }
  getGroups() {
    return this.db.getGroups();
  }
  getGroupSource() {
    return this.db.getGroupSource();
  }
  getLanguageSource(group) {
    return this.db.getLanguageSource(group);
  }
  doStart() {
    this.removeEvents();
    this.scanning = true;
    this.scan(document.head);
    this.scan(document.body);
    this.doTranslate(this.nodeMap, true);
  }
  mutationObserverHandler(mutations) {
    let map = new Map();
    mutations.forEach(mutation => {
      switch (mutation.type) {
        case 'attributes':
          this.scanAttribute(mutation.target, mutation.attributeName, map);
          break;
        case 'characterData':
          if (mutation.target instanceof Text) {
            this.scanText(mutation.target, map);
          }
          break;
        case 'childList':
          this.scan(mutation.target, map);
          break;
      }
    });
    if (map.size > 0) {
      this.doTranslate(map);
      this.clearRemoveNode();
    }
  }
  /**
   * 監聽 Element 新增跟異動事件
   */
  addEvents() {
    if (this.scanning) {
      this.mutationObserver.observe(document.documentElement, {
        attributeFilter: ['value', 'type', _constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.TranslateKey, _constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.IgnoreAttributeName],
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  }
  /**
   * 移除 Element 新增跟異動事件
   */
  removeEvents() {
    this.mutationObserver.disconnect();
  }
  scanAttribute(target, key, map) {
    key = key.toLowerCase();
    switch (key) {
      case _constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.TranslateKey:
        let value = target.getAttribute(key);
        let translateNode;
        if (target instanceof HTMLInputElement) {
          translateNode = new _nodes_translate_node_submit__WEBPACK_IMPORTED_MODULE_2__["default"](this, target, value);
          this.addNode(translateNode, map);
        } else {
          translateNode = new _nodes_translate_node_text__WEBPACK_IMPORTED_MODULE_3__["default"](this, target, value);
          this.addNode(translateNode, map);
        }
        break;
      case _constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.IgnoreAttributeName:
        if (target.getAttribute(_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.IgnoreAttributeName) != 'false') {
          this.nodeMap.delete(target);
          this.translateGroupMap.delete(target);
          this.ignoreMap.set(target, true);
        }
        break;
      case 'value':
      case 'type':
        this.addNode(new _nodes_translate_node_submit__WEBPACK_IMPORTED_MODULE_2__["default"](this, target, this.findGroup(target)), map);
        break;
    }
  }
  scan(node, map, index = -1) {
    // node is Text
    if (node instanceof Text) {
      this.scanText(node, map, index);
    } else if (node.nodeType == 1) {
      if (this.ignore(node)) {
        return;
      }
      let element = node;
      let key = element.getAttribute(_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.TranslateKey);
      if (element instanceof HTMLInputElement) {
        if (element.tagName == 'INPUT' && element.value != undefined && (element?.type || '').toLowerCase() == 'submit') {
          // find sumbit button
          this.addNode(new _nodes_translate_node_submit__WEBPACK_IMPORTED_MODULE_2__["default"](this, element, key), map);
        } else if (element.placeholder != undefined && element.placeholder != '') {
          // find input or textarea placeholder
          this.addNode(new _nodes_translate_node_placeholder__WEBPACK_IMPORTED_MODULE_1__["default"](this, element, this.findGroup(element), key), map);
        }
      } else {
        if (key) {
          this.addNode(new _nodes_translate_node_text__WEBPACK_IMPORTED_MODULE_3__["default"](this, element, this.findGroup(element), key), map);
        } else {
          element.childNodes.forEach((child, i) => {
            this.scan(child, map, i);
          });
        }
      }
    }
  }
  scanText(node, map, index = -1) {
    let parent = this.getParent(node);
    if (this.ignore(parent)) {
      return;
    }
    // node is Text
    let key = parent.getAttribute(_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.TranslateKey);
    this.addNode(new _nodes_translate_node_text__WEBPACK_IMPORTED_MODULE_3__["default"](this, parent, this.findGroup(parent), key, index), map);
  }
  addNode(translateNode, map) {
    if (translateNode.match()) {
      this.nodeMap.set(translateNode.getNode(), translateNode);
      if (map) {
        map.set(translateNode.getNode(), translateNode);
      }
    }
  }
  ignore(node) {
    if (node) {
      if (this.ignoreMap.get(node)) {
        return true;
      }
      if (this.translateGroupMap.get(node)) {
        return false;
      }
      if (node == document.documentElement) {
        return false;
      }
      if (node.nodeType == 1) {
        let element = node;
        if (_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.IgnoreTagArray[element.tagName]) {
          return true;
        }
        let value = element.getAttribute(_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.IgnoreAttributeName);
        if (value == undefined || value == 'false') {
          let ignore = this.ignore(this.getParent(element));
          if (ignore) {
            this.ignoreMap.set(element, true);
          } else {
            this.translateGroupMap.set(element, element.getAttribute(_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.TranslateGroup) || _constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.DefaultGroup);
          }
          return ignore;
        } else {
          this.ignoreMap.set(element, true);
          return true;
        }
      }
    }
    return true;
  }
  findGroup(element) {
    while (element != document.documentElement) {
      let group = element.getAttribute(_constant__WEBPACK_IMPORTED_MODULE_6__.TranslateConst.TranslateGroup);
      if (group) {
        return group;
      }
      element = this.getParent(element);
    }
    return undefined;
  }
  getParent(element) {
    if (element.parentElement != undefined) {
      return element.parentElement;
    }
    if (element.parentNode != undefined) {
      return element.parentNode;
    }
    return undefined;
  }
  doTranslate(map, force = false) {
    this.removeEvents();
    if (force) {
      this.db.clearCache();
    }
    let t = Date.now();
    map.forEach((v, k, m) => {
      if (v.alive()) {
        v.translate();
      } else {
        v.destroy();
        m.delete(k);
      }
    });
    console.log('translate count:', map.size, ' time:', Date.now() - t);
    this.addEvents();
  }
  clearRemoveNode() {
    this.doClearRemoveNode();
  }
  clear() {
    this.nodeMap.forEach(node => {
      node.destroy();
    });
    this.nodeMap.clear();
    this.ignoreMap.clear();
    this.translateGroupMap.clear();
  }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_4__.Delay)(10000)], TranslateGO.prototype, "clearRemoveNode", null);

/***/ }),

/***/ 2518:
/*!********************************!*\
  !*** ./src/ts/lib/cui/core.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractStroage: () => (/* reexport safe */ _core_storage_abstract_storage__WEBPACK_IMPORTED_MODULE_2__.AbstractStroage),
/* harmony export */   Async: () => (/* reexport safe */ _core_decorators_async__WEBPACK_IMPORTED_MODULE_6__.Async),
/* harmony export */   CUI: () => (/* reexport safe */ _core_cui__WEBPACK_IMPORTED_MODULE_1__.CUI),
/* harmony export */   Cache: () => (/* reexport safe */ _core_decorators_cache__WEBPACK_IMPORTED_MODULE_5__.Cache),
/* harmony export */   Delay: () => (/* reexport safe */ _core_decorators_delay__WEBPACK_IMPORTED_MODULE_7__.Delay),
/* harmony export */   EventListenerContainer: () => (/* reexport safe */ _core_listener_event_listener_container__WEBPACK_IMPORTED_MODULE_11__.EventListenerContainer),
/* harmony export */   ListenerContainer: () => (/* reexport safe */ _core_listener_listener_container__WEBPACK_IMPORTED_MODULE_10__.ListenerContainer),
/* harmony export */   Loader: () => (/* reexport safe */ _core_component_loader__WEBPACK_IMPORTED_MODULE_8__.Loader),
/* harmony export */   LocalStorageManager: () => (/* reexport safe */ _core_storage_local_storage_manager__WEBPACK_IMPORTED_MODULE_3__.LocalStorageManager),
/* harmony export */   Overlay: () => (/* reexport safe */ _core_component_overlay__WEBPACK_IMPORTED_MODULE_9__.Overlay),
/* harmony export */   SessionStorageManager: () => (/* reexport safe */ _core_storage_session_storage_manager__WEBPACK_IMPORTED_MODULE_4__.SessionStorageManager),
/* harmony export */   ToDelayFn: () => (/* reexport safe */ _core_decorators_delay__WEBPACK_IMPORTED_MODULE_7__.toDelayFn),
/* harmony export */   clone: () => (/* reexport safe */ _core_clone__WEBPACK_IMPORTED_MODULE_0__.clone),
/* harmony export */   deepClone: () => (/* reexport safe */ _core_clone__WEBPACK_IMPORTED_MODULE_0__.deepClone)
/* harmony export */ });
/* harmony import */ var _core_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/clone */ 4927);
/* harmony import */ var _core_cui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/cui */ 9769);
/* harmony import */ var _core_storage_abstract_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/storage/abstract-storage */ 6886);
/* harmony import */ var _core_storage_local_storage_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/storage/local-storage-manager */ 4047);
/* harmony import */ var _core_storage_session_storage_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/storage/session-storage-manager */ 2348);
/* harmony import */ var _core_decorators_cache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/decorators/cache */ 2892);
/* harmony import */ var _core_decorators_async__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/decorators/async */ 1886);
/* harmony import */ var _core_decorators_delay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/decorators/delay */ 150);
/* harmony import */ var _core_component_loader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/component/loader */ 3261);
/* harmony import */ var _core_component_overlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core/component/overlay */ 303);
/* harmony import */ var _core_listener_listener_container__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/listener/listener-container */ 1472);
/* harmony import */ var _core_listener_event_listener_container__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/listener/event-listener-container */ 9903);













/***/ }),

/***/ 4927:
/*!**************************************!*\
  !*** ./src/ts/lib/cui/core/clone.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clone: () => (/* binding */ clone),
/* harmony export */   deepClone: () => (/* binding */ deepClone)
/* harmony export */ });
function clone(...args) {
  return doClone(args);
}
function deepClone(...args) {
  return doClone(args, []);
}
function doClone(args, logs) {
  // tslint:disable-next-line:variable-name
  let source;
  // tslint:disable-next-line:variable-name
  let dest;
  if (args.length === 1) {
    source = args[0];
  } else if (args.length === 2) {
    dest = args[0];
    source = args[1];
  } else {
    return;
  }
  if (Array.isArray(source)) {
    dest = Array.isArray(dest) ? dest : [];
  } else if (isObject(source)) {
    dest = isObject(dest) ? dest : {};
  } else {
    // tslint:disable-next-line:triple-equals
    return source == undefined ? dest : source;
  }
  if (logs === undefined) {
    return copy(dest, source);
  } else {
    return deepCopy(logs, dest, source);
  }
}
/**
 * 複製
 */
function copy(dest, source) {
  // tslint:disable-next-line:forin
  for (let i in source) {
    dest[i] = source[i];
  }
  return dest;
}
/**
 * 複製
 */
function deepCopy(logs, dest, source) {
  if (logs.indexOf(source) !== -1) {
    return source;
  }
  logs.push(source);
  // tslint:disable-next-line:forin
  for (let i in source) {
    dest[i] = getValue(logs, dest[i], source[i]);
  }
  return dest;
}
function getValue(logs, dest, source) {
  if (Array.isArray(source)) {
    return deepCopy(logs, dest || [], source);
  } else if (isObject(source)) {
    return deepCopy(logs, dest || {}, source);
  } else {
    return source;
  }
}
function isObject(value) {
  if (value === null || value === undefined) {
    return false;
  }
  return value.constructor === Object;
}

/***/ }),

/***/ 3261:
/*!*************************************************!*\
  !*** ./src/ts/lib/cui/core/component/loader.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Loader: () => (/* binding */ Loader)
/* harmony export */ });
/**
 * Loader物件
 * by clare
 */
class Loader {
  static #_ = this.defText = '處理中';
  static #_2 = this.loadHtml = [' <div class="ttb-loader-block">', '   <div class="ttb-loading"></div>', '   <div class="text"></div>', ' </div>'].join('');
  constructor() {
    this.openCount = 0;
    this.defauleZIndex = '999';
    /**
     * 回傳物件
     */
    this.getElement = () => {
      return this.element;
    };
    this.message = msg => {
      if (msg) {
        this.textElement.innerHTML = msg;
      } else {
        this.textElement.innerHTML = Loader.defText;
      }
    };
    /**
     * 延遲開啟繞圈圈動畫，如果等待時間太短就不用出現
     * @param {string} msg 顯示訊息
     * @param {any} zIndex css z-index
     */
    this.open = (msg, zIndex) => {
      this.openCount++;
      clearTimeout(this.openTimer);
      this.openTimer = setTimeout(this.doOpen.bind(this, msg, zIndex), 300);
    };
    this.openNotDelay = (msg, zIndex) => {
      this.openCount++;
      this.doOpen(msg, zIndex);
    };
    /**
     * 開啟繞圈圈動畫
     * @param {string} msg 顯示訊息
     * @param {any} zIndex css z-index
     */
    this.doOpen = (msg, zIndex) => {
      if (this.openCount > 0) {
        if (zIndex) {
          this.element.style.zIndex = zIndex;
        } else {
          this.element.style.zIndex = this.defauleZIndex;
        }
        if (msg) {
          this.textElement.innerHTML = msg;
        } else {
          this.textElement.innerHTML = Loader.defText;
        }
        this.element.classList.add('show');
        this.addParentClass();
      }
    };
    /**
     * 關閉繞圈圈
     */
    this.close = () => {
      if (--this.openCount > 0) {
        return;
      }
      clearTimeout(this.openTimer);
      this.openCount = 0;
      this.element.style.zIndex = '';
      this.element.classList.remove('show');
      this.removeParentClass();
    };
    /**
     * 絕對關閉繞圈圈
     */
    this.closeAll = () => {
      this.openCount = 0;
      this.element.style.zIndex = '';
      this.element.classList.remove('show');
      this.removeParentClass();
    };
    /**
     * 產生繞圈圈物件
     */
    this.create = () => {
      let element = document.createElement('div');
      element.className = 'ttb-loader';
      element.innerHTML = Loader.loadHtml;
      return element;
    };
    this.element = this.create();
    this.textElement = this.element.querySelector('.text');
  }
  addParentClass() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.classList.add('ttb-loader-hidden');
    }
  }
  removeParentClass() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.classList.remove('ttb-loader-hidden');
    }
  }
}
window['loader'] = new Loader();

/***/ }),

/***/ 303:
/*!**************************************************!*\
  !*** ./src/ts/lib/cui/core/component/overlay.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Overlay: () => (/* binding */ Overlay),
/* harmony export */   OverlayClassName: () => (/* binding */ OverlayClassName)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../clone */ 4927);
/* harmony import */ var _cui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cui */ 9769);
/* harmony import */ var _decorators_async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/async */ 1886);




var OverlayClassName;
(function (OverlayClassName) {
  OverlayClassName["overlay"] = "ttb-overlay";
  OverlayClassName["screen"] = "ttb-overlay-screen";
  OverlayClassName["bodyOpen"] = "ttb-overlay-open";
  OverlayClassName["open"] = "open";
})(OverlayClassName || (OverlayClassName = {}));
/**
 * 用來擺放dialog
 */
class Overlay {
  static #_ = this.openCount = 0;
  static #_2 = this.zIndex = 0;
  constructor(config = {}) {
    this.show = false;
    this.doRemove = () => {
      this.element.removeEventListener('transitionend', this.doRemove);
      this.config.onClose();
      _cui__WEBPACK_IMPORTED_MODULE_1__.CUI.remove(this.element);
      _cui__WEBPACK_IMPORTED_MODULE_1__.CUI.remove(this.screenElement);
    };
    this.config = (0,_clone__WEBPACK_IMPORTED_MODULE_0__.clone)({
      zIndex: 100,
      onOpen: () => {},
      onClose: () => {}
    }, config);
    this.element = document.createElement('div');
    this.element.className = OverlayClassName.overlay;
    this.screenElement = document.createElement('div');
    this.screenElement.className = OverlayClassName.screen;
  }
  getElement() {
    return this.element;
  }
  /**
   * 順序很重要
   * 開啟
  */
  open() {
    if (this.show) {
      return;
    }
    if (!this.screenElement.isConnected) {
      document.body.appendChild(this.screenElement);
    }
    if (!this.element.isConnected) {
      document.body.appendChild(this.element);
    }
    this.show = true;
    Overlay.openCount++;
    clearTimeout(this.timer);
    this.timer = this.doOpen();
  }
  doOpen() {
    this.screenElement.style.zIndex = String(++Overlay.zIndex + this.config.zIndex);
    this.element.style.zIndex = String(++Overlay.zIndex + this.config.zIndex);
    this.screenElement.classList.add(OverlayClassName.open);
    this.element.classList.add(OverlayClassName.open);
    this.config.onOpen();
  }
  /**
   * 關閉
   * callback 等到關閉動畫完成後呼叫
  */
  close() {
    if (!this.show) {
      return;
    }
    this.show = false;
    if (--Overlay.openCount <= 0) {
      Overlay.openCount = 0;
      Overlay.zIndex = 0;
    }
    this.element.addEventListener('transitionend', this.doRemove);
    this.element.classList.remove(OverlayClassName.open);
    this.screenElement.classList.remove(OverlayClassName.open);
    clearTimeout(this.timer);
  }
  /**
   * 移除物件
  */
  destory() {
    clearTimeout(this.timer);
    _cui__WEBPACK_IMPORTED_MODULE_1__.CUI.remove(this.element);
    _cui__WEBPACK_IMPORTED_MODULE_1__.CUI.remove(this.screenElement);
    this.element = null;
    this.screenElement = null;
  }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_decorators_async__WEBPACK_IMPORTED_MODULE_2__.Async)()], Overlay.prototype, "doOpen", null);

/***/ }),

/***/ 9769:
/*!************************************!*\
  !*** ./src/ts/lib/cui/core/cui.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CUI: () => (/* binding */ CUI)
/* harmony export */ });
/**
 * 負責處理一些有的沒有的
 * by clare
 */
class CUI {
  /**
   * 防止XSS
   * @author Clare
   * @param {String}
   * @return {String}
   */
  static #_ = this.escaped = (() => {
    const _key = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '/': '&#x2F;',
      '"': '&quot;',
      '\'': '&#x27;'
    };
    function _escaped(m) {
      return _key[m];
    }
    return str => {
      return String(str).replace(/[<>&/\"\']/g, _escaped);
    };
  })();
  /**
   * 字串格式化
   * @param {String} str 字串
   * @param {Object} values 替換參數
   * @return {String} str
   */
  static #_2 = this.format = (() => {
    let regCache = {};
    function _getRegExp(key) {
      return regCache[key] || (regCache[key] = new RegExp('\\{\\{' + key + '\\}\\}', 'gm'));
    }
    return (str, values) => {
      if (!CUI.isObject(values)) {
        return str;
      }
      for (let i in values) {
        str = str.replace(_getRegExp(i), values[i]);
      }
      return str;
    };
  })();
  /**
   * 將json 轉成 html
   * @param {String or Object} str
   * @return {String} html
   */
  static #_3 = this.printJson = function () {
    const _space = '&emsp;&emsp;';
    const _nameHtml = '<span>"{{text}}"</span>';
    const _valueStringHtml = '<span style="color:#690">"{{text}}"</span>';
    const _valueHtml = '<span style="color:#a11">{{text}}</span>';
    let _nowSpace = '';
    return function (str) {
      _nowSpace = '';
      if (!str) {
        return str;
      }
      if (str.constructor === Object) {
        return _toHtml(str);
      }
      if (str.constructor === Array) {
        return _toHtml(str);
      } else if (typeof str === 'string') {
        try {
          return _toHtml(JSON.parse(str.replace(/\n/g, '\\\\n')));
        } catch (e) {
          return str;
        }
      } else {
        return str;
      }
    };
    function _toHtml(data) {
      if (!data) {
        return _getValue(data);
      }
      if (data.constructor === Object) {
        return _objectToHtml(data);
      } else if (data.constructor === Array) {
        return _arrayToHtml(data);
      } else {
        return _getValue(data);
      }
    }
    function _objectToHtml(obj) {
      let html = '{<br>';
      let hasData = false;
      _nowSpace += _space;
      for (let i in obj) {
        hasData = true;
        html += _nowSpace + _getName(i) + '&emsp;:&emsp;' + _toHtml(obj[i]) + ',<br>';
      }
      _nowSpace = _nowSpace.replace(_space, '');
      html += _nowSpace + '}';
      if (hasData) {
        return html;
      } else {
        return '{}';
      }
    }
    function _arrayToHtml(array) {
      let nowrap = array.length < 3 ? '' : '<br>';
      let html = '[' + nowrap;
      _nowSpace += _space;
      let thatSpace = nowrap && _nowSpace;
      for (let i in array) {
        array[i] = _toHtml(array[i]);
      }
      html += thatSpace + array.join(',' + nowrap + thatSpace);
      _nowSpace = _nowSpace.replace(_space, '');
      thatSpace = nowrap && _nowSpace;
      html += nowrap + thatSpace + ']';
      return html;
    }
    function _getName(text) {
      return CUI.format(_nameHtml, {
        text: CUI.escaped(text)
      });
    }
    function _getValue(text) {
      if (typeof text === 'string') {
        return CUI.format(_valueStringHtml, {
          text: CUI.escaped(text)
        });
      } else {
        return CUI.format(_valueHtml, {
          text: CUI.escaped(text)
        });
      }
    }
  }();
  /**
   * 延遲執行方法
   * @param name
   * @param delay ms
   * @param function
   */
  static #_4 = this.delayAction = (() => {
    let _timers = {};
    return function (name, delay, fn) {
      if (_timers[name]) {
        clearTimeout(_timers[name]);
      }
      let args = [].slice.call(arguments, 3);
      _timers[name] = setTimeout(function () {
        fn.apply(null, args);
        delete _timers[name];
      }, delay);
    };
  })();
  /**
   * 是否為空值
   * @param {?} value
   * @return {Boolean}
   */
  static isEmpty(value) {
    if (value === null || value === undefined || value == '') {
      return true;
    }
    return false;
  }
  /**
   * 是否為純Array
   * @param {?} value
   * @return {Boolean}
   */
  static isArray(value) {
    return value instanceof Array;
  }
  /**
   * 是否為純Object
   * @param {?} value
   * @return {Boolean}
   */
  static isObject(value) {
    if (value === null || value === undefined) {
      return false;
    }
    return value.constructor === Object;
  }
  /**
   * 是否為空物件
   * @param {?} value
   * @return {Boolean}
   */
  static isEmptyObject(value) {
    if (value) {
      for (let i in value) {
        return false;
      }
    }
    return true;
  }
  /**
   * 是否為純Function
   * @param {?} value
   * @return {Boolean}
   */
  static isFunction(value) {
    return value instanceof Function;
  }
  /**
   * 空值轉換為預設值
   * @param {?} value
   * @param {?} def
   * @return {?} value or default
   */
  static emptyToDefault(value, def) {
    return CUI.isEmpty(value) ? def : value;
  }
  /**
   * 減少程式碼XD
   * @param fn 想要執行的function，不存在也會過濾掉
   * @param thisArgs
   */
  static callFunction(fn, thisArgs, ...data) {
    if (CUI.isFunction(fn)) {
      return fn.apply(thisArgs, [].slice.call(arguments, 2));
    }
    return;
  }
  /**
   * 深複製
   * 1. deepClone(被複製物件) 回傳全新物件
   * 2. deepClone(目標物件，被複製物件)
   * @param data
   */
  static deepClone(...data) {
    let _orginData;
    let _destData;
    // 紀錄複製的物件，避免無窮遞迴
    let _logArray = [];
    if (arguments.length === 1) {
      _orginData = arguments[0];
    } else if (arguments.length === 2) {
      _destData = arguments[0];
      _orginData = arguments[1];
    } else {
      return;
    }
    if (CUI.isArray(_orginData)) {
      _destData = CUI.isArray(_destData) ? _destData : [];
    } else if (CUI.isObject(_orginData)) {
      _destData = CUI.isObject(_destData) ? _destData : {};
    } else {
      return _orginData == undefined ? _destData : _orginData;
    }
    return _copy(_destData, _orginData);
    /**
     * 複製
     */
    function _copy(dest, orgin) {
      if (_logArray.indexOf(orgin) !== -1) {
        return orgin;
      }
      _logArray.push(orgin);
      for (let i in orgin) {
        dest[i] = _getValue(orgin[i]);
      }
      return dest;
    }
    function _getValue(v) {
      if (CUI.isArray(v)) {
        return _copy([], v);
      } else if (CUI.isObject(v)) {
        return _copy({}, v);
      } else {
        return v;
      }
    }
  }
  /**
   * Object 轉換成 Combobox 陣列
   * @param data
   */
  static objectToCombobox(data) {
    try {
      let array = [];
      for (let key in data) {
        array.push({
          value: key,
          name: data[key]
        });
      }
      return array;
    } catch (e) {
      alert(e);
    }
  }
  /**
   * Object 轉換成 Combobox 陣列
   * @param data
   */
  static objectToArray(data) {
    try {
      let array = [];
      for (let key in data) {
        array.push(data[key]);
      }
      return array;
    } catch (e) {
      alert(e);
    }
  }
  /**
   * Object 轉換成 Combobox 陣列
   * @param data
   */
  static comboboxToValueName(array, render) {
    try {
      let valueName = {};
      let data;
      for (let i in array) {
        data = array[i];
        valueName[data.value] = render ? render(data) : data.name;
      }
      return valueName;
    } catch (e) {
      alert(e);
    }
  }
  /**
   * 模擬form submit
   * @param config
   */
  static submit(config) {
    config = CUI.deepClone({
      target: '_self',
      method: 'post'
    }, config);
    let formElement = CUI.create('form');
    formElement.action = config.url;
    formElement.method = config.method;
    formElement.target = config.target;
    for (let name in config.params) {
      let input = CUI.create('input');
      input.type = 'hidden';
      input.name = name;
      input.value = config.params[name];
      formElement.appendChild(input);
    }
    document.body.appendChild(formElement);
    formElement.submit();
    setTimeout(function () {
      if (formElement) {
        CUI.remove(formElement);
        formElement = null;
      }
    }, 1000);
  }
  /**
   * 監聽內容變化
   * @param element
   * @param handler
   */
  static addElementContentChangeEvent(element, handler) {
    if (element) {
      element.addEventListener('DOMSubtreeModified', handler);
    }
  }
  /**
   * 移除監聽內容變化
   * @param element
   * @param handler
   */
  static removeElementContentChangeEvent(element, handler) {
    if (element) {
      element.removeEventListener('DOMSubtreeModified', handler);
    }
  }
  /**
   * 設定Element Translate置中
   * @param element
   */
  static setTranslateCenter(element) {
    let height = element.offsetHeight;
    let width = element.offsetWidth;
    let translateTop = Math.round(height / 2);
    let translateLeft = Math.round(width / 2);
    CUI.style(element, 'transform', 'translate(-' + translateLeft + 'px,-' + translateTop + 'px)');
  }
  /**
   * 設定Element Translate置中
   * @param element
   */
  static setCenter(element) {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let height = element.offsetHeight;
    let width = element.offsetWidth;
    let top = '50%';
    let left = '50%';
    let translateTop = Math.round(height / 2);
    let translateLeft = Math.round(width / 2);
    if (width > winWidth) {
      left = '10px';
      translateLeft = 0;
    }
    if (height > winHeight) {
      top = '20px';
      translateTop = 0;
    }
    element.style.top = top;
    element.style.left = left;
    CUI.style(element, 'transform', 'translate(-' + translateLeft + 'px,-' + translateTop + 'px)');
  }
  /**
   * 監聽Element中有input:focus和Enter keyup
   * @param element
   * @param handler
   */
  static addListenOnEnter(element, handler) {
    if (element instanceof Element) {
      element.addEventListener('keyup', e => {
        if (e.which == 13 && (element.tagName == 'INPUT' || element.querySelector('input:focus'))) {
          handler.call(element, e);
        }
      });
    }
  }
  /**
   * 產生HTMLElement，純粹減少編譯後的方法長度
   * @param tagName
   */
  static create(tagName) {
    return document.createElement(tagName);
  }
  /**
   * 檢查HTMLElement是否渲染在body上
   * @param element
   */
  static isConnected(element) {
    if (element && element.parentElement) {
      if (element.isConnected == undefined) {
        if (element == document.body || element.parentElement == document.body) {
          return true;
        } else {
          return CUI.isConnected(element.parentElement);
        }
      } else {
        return element.isConnected;
      }
    } else {
      return false;
    }
  }
  /**
   * 移除HTMLElement
   * 為了相容IE
   * @param element
   */
  static remove(element) {
    if (element) {
      if (element.remove) {
        element.remove();
      } else if (element.parentElement) {
        element.parentElement.removeChild(element);
      }
    }
  }
  /**
   * 設定瀏覽器相容的css 屬性
   * @param element
   * @param key
   * @param value
   */
  static style(element, key, value) {
    if (element && key) {
      element.style[key] = value;
      key = key[0].toUpperCase() + key.substring(1);
      element.style['webkit' + key] = value;
      element.style['moz' + key] = value;
      element.style['ms' + key] = value;
      element.style['o' + key] = value;
    }
  }
}

/***/ }),

/***/ 1886:
/*!*************************************************!*\
  !*** ./src/ts/lib/cui/core/decorators/async.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Async: () => (/* binding */ Async),
/* harmony export */   toAsyncFn: () => (/* binding */ toAsyncFn)
/* harmony export */ });
/**
 * 非同步執行
 * @param ms
 */
function Async(ms = 0) {
  return function (target, name, descriptor) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, name);
    }
    let method = descriptor.value;
    descriptor.value = function (...args) {
      return setTimeout(() => {
        method.apply(this, args);
      }, ms);
    };
    return descriptor;
  };
}
function toAsyncFn(fn, ms = 0) {
  return function (...args) {
    return setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}

/***/ }),

/***/ 2892:
/*!*************************************************!*\
  !*** ./src/ts/lib/cui/core/decorators/cache.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cache: () => (/* binding */ Cache)
/* harmony export */ });
/* harmony import */ var _storage_local_storage_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../storage/local-storage-manager */ 4047);
/* harmony import */ var _storage_session_storage_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/session-storage-manager */ 2348);
/* harmony import */ var _cui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cui */ 9769);



/**
 * 緩存
 */
var Cache;
(function (Cache) {
  const id = '__TranslateGOCache';
  /** 需要回寫的方法 */
  let cacheUnloadHandlers = {};
  let localCache = _storage_local_storage_manager__WEBPACK_IMPORTED_MODULE_0__.LocalStorageManager.get(id, false) || {};
  let sessionCache = _storage_session_storage_manager__WEBPACK_IMPORTED_MODULE_1__.SessionStorageManager.get(id, false) || {};
  /**
   *
   * @param scope 取得緩存資料
   * @param key
   */
  function getLocal(scope, key) {
    return localCache[scope + '.' + key];
  }
  Cache.getLocal = getLocal;
  /**
   *
   * @param scope 取得緩存資料
   * @param key
   */
  function getSession(scope, key) {
    return sessionCache[scope + '.' + key];
  }
  Cache.getSession = getSession;
  /**
   *
   * @param scope 寫入緩存資料
   * @param key
   */
  function setLocal(scope, key, value) {
    return localCache[scope + '.' + key] = value;
  }
  Cache.setLocal = setLocal;
  /**
   *
   * @param scope 寫入緩存資料
   * @param key
   */
  function setSession(scope, key, value) {
    return sessionCache[scope + '.' + key] = value;
  }
  Cache.setSession = setSession;
  /**
   * window unload 處理
   */
  function onUnloadHandler() {
    for (let key in cacheUnloadHandlers) {
      cacheUnloadHandlers[key]();
    }
    if (_storage_local_storage_manager__WEBPACK_IMPORTED_MODULE_0__.LocalStorageManager.isExist(id)) {
      _storage_local_storage_manager__WEBPACK_IMPORTED_MODULE_0__.LocalStorageManager.set(id, localCache, false);
    }
    if (_storage_session_storage_manager__WEBPACK_IMPORTED_MODULE_1__.SessionStorageManager.isExist(id)) {
      _storage_session_storage_manager__WEBPACK_IMPORTED_MODULE_1__.SessionStorageManager.set(id, sessionCache, false);
    }
  }
  Cache.onUnloadHandler = onUnloadHandler;
  /**
   * 儲存
   */
  function save() {
    _storage_local_storage_manager__WEBPACK_IMPORTED_MODULE_0__.LocalStorageManager.set(id, localCache, false);
    _storage_session_storage_manager__WEBPACK_IMPORTED_MODULE_1__.SessionStorageManager.set(id, sessionCache, false);
  }
  Cache.save = save;
  /**
   * 緩存方法
   * @param cache
   * @param scope
   * @param target
   * @param key
   */
  function basic(cache, scope, defaultValue, target, key) {
    let _cacheKey = scope + '.' + key;
    let _val = _cui__WEBPACK_IMPORTED_MODULE_2__.CUI.deepClone(defaultValue, cache[_cacheKey]);
    cache[_cacheKey] = _val;
    cacheUnloadHandlers[_cacheKey] = function () {
      cache[_cacheKey] = _cui__WEBPACK_IMPORTED_MODULE_2__.CUI.deepClone(_val);
    };
    // Delete property.
    if (delete target[key]) {
      // Create new property with getter and setter
      Object.defineProperty(target, key, {
        get: function () {
          return _val;
        },
        set: function (value) {
          _val = value;
        },
        enumerable: true,
        configurable: true
      });
    }
  }
  /**
   * LocalStorageManager 緩存
   * @param scope cache scope name
   */
  function local(scope, defaultValue) {
    return basic.bind(undefined, localCache, scope, defaultValue);
  }
  Cache.local = local;
  /**
   * SessionStorageManager 緩存
   * @param scope cache scope name
   */
  function session(scope, defaultValue) {
    return basic.bind(undefined, sessionCache, scope, defaultValue);
  }
  Cache.session = session;
})(Cache || (Cache = {}));
/**
 * 回寫到storage
 */
window.addEventListener('unload', Cache.onUnloadHandler);
Cache.save();

/***/ }),

/***/ 150:
/*!*************************************************!*\
  !*** ./src/ts/lib/cui/core/decorators/delay.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Delay: () => (/* binding */ Delay),
/* harmony export */   toDelayFn: () => (/* binding */ toDelayFn)
/* harmony export */ });
/**
 * 延遲執行
 * @param ms 延迟时间
 * @param interval 最大間隔，超过一定执行
 */
function Delay(ms = 0, interval = 0) {
  return function (target, name, descriptor) {
    if (!descriptor) {
      descriptor = Object.getOwnPropertyDescriptor(target, name);
    }
    let timerName = `__delay_${name}`;
    let method = descriptor.value;
    let scope = {
      ms: ms,
      interval: interval,
      callFn: function (ms, args) {
        clearTimeout(this[timerName]);
        let timer = this[timerName] = setTimeout(() => {
          method.apply(this, args);
        }, ms);
        return timer;
      }
    };
    descriptor.value = function (...args) {
      return runner.call(this, scope, args);
    };
    return descriptor;
  };
}
function toDelayFn(fn, ms = 0, interval = 0) {
  let timer;
  let scope = {
    ms: ms,
    interval: interval,
    callFn: function (ms, args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, ms);
      return timer;
    }
  };
  return function (...args) {
    return runner.call(this, scope, args);
  };
}
function runner(scope, args) {
  let ms = scope.ms;
  if (scope.interval > 0) {
    let now = Date.now();
    if (!scope.time) {
      scope.time = now + scope.interval;
    }
    if (scope.time <= now) {
      scope.time = 0;
      ms = 0;
    }
  }
  return scope.callFn.call(this, ms, args);
}

/***/ }),

/***/ 2122:
/*!*****************************************************!*\
  !*** ./src/ts/lib/cui/core/decorators/took-time.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TookTime: () => (/* binding */ TookTime),
/* harmony export */   toTookTimeFn: () => (/* binding */ toTookTimeFn)
/* harmony export */ });
function TookTime(target, name, descriptor) {
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, name);
  }
  let method = descriptor.value;
  descriptor.value = function (...args) {
    let t = Date.now();
    try {
      return method.apply(this, args);
    } finally {
      console.log(`%c${this.constructor.name}.${name} took time ${Date.now() - t}ms`, 'color: #2196F3;font-weight: bold;', Date.now());
    }
  };
  return descriptor;
}
function toTookTimeFn(fn, ms = 0) {
  return function (...args) {
    let t = Date.now();
    try {
      return fn.apply(this, args);
    } finally {
      console.log(`%c${this.constructor.name}.${name} took time ${Date.now() - t}ms`, 'color: #2196F3;font-weight: bold;', Date.now());
    }
  };
}

/***/ }),

/***/ 9903:
/*!******************************************************************!*\
  !*** ./src/ts/lib/cui/core/listener/event-listener-container.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventListenerContainer: () => (/* binding */ EventListenerContainer)
/* harmony export */ });
/* harmony import */ var _listener_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listener-container */ 1472);

class EventListenerContainer {
  constructor() {
    this.eventListeners = {};
  }
  addListener(event, listener, target = window) {
    let listeners = this.eventListeners[event];
    if (!listeners) {
      listeners = this.eventListeners[event] = new _listener_container__WEBPACK_IMPORTED_MODULE_0__.ListenerContainer();
    }
    listeners.addListener(listener, target);
    return listener;
  }
  addOnceListener(event, listener, target = window) {
    let listeners = this.eventListeners[event];
    if (!listeners) {
      listeners = this.eventListeners[event] = new _listener_container__WEBPACK_IMPORTED_MODULE_0__.ListenerContainer();
    }
    listeners.addOnceListener(listener, target);
    return listener;
  }
  removeListener(event, listener) {
    let listeners = this.eventListeners[event];
    if (!listeners) return;
    listeners.removeListener(listener);
  }
  removeAllEventListener(event) {
    delete this.eventListeners[event];
  }
  removeAllListener(target) {
    for (let event in this.eventListeners) {
      this.eventListeners[event].removeAllListener(target);
    }
  }
  dispatch(name, ...args) {
    let listeners = this.eventListeners[name];
    if (!listeners) return;
    return listeners.dispatch(...args);
  }
  count(name) {
    return this.eventListeners[name]?.count() || 0;
  }
  clear() {
    for (let event in this.eventListeners) {
      this.eventListeners[event].clear();
    }
  }
}

/***/ }),

/***/ 1472:
/*!************************************************************!*\
  !*** ./src/ts/lib/cui/core/listener/listener-container.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListenerContainer: () => (/* binding */ ListenerContainer)
/* harmony export */ });
class ListenerContainer {
  constructor() {
    this.listenerMap = new Map();
    this.listeners = [];
  }
  addListener(listener, target = window) {
    if (this.listenerMap.get(listener)) {
      return;
    }
    let data = {
      target: target,
      listener: listener,
      once: false
    };
    this.listeners.push(data);
    this.listenerMap.set(listener, data);
    return listener;
  }
  addOnceListener(listener, target = window) {
    if (this.listenerMap.get(listener)) {
      return;
    }
    let data = {
      target: target,
      listener: listener,
      once: true
    };
    this.listeners.push(data);
    this.listenerMap.set(listener, data);
    return listener;
  }
  removeListener(listener) {
    this.listeners.forEach((data, i) => {
      if (data?.listener == listener) this.mark(data.listener, i);
    });
    this.clearMark();
  }
  removeAllListener(target) {
    this.listeners.forEach((data, i) => {
      if (data?.target == target) this.mark(data.listener, i);
    });
    this.clearMark();
  }
  dispatch(...args) {
    return this.dispatchIgnoreTarget(null, ...args);
  }
  dispatchIgnoreTarget(target, ...args) {
    if (this.listeners.length == 0) return;
    let results = [];
    this.listeners.forEach((data, i) => {
      try {
        if (target == data?.target) return;
        results.push(data.listener.apply(data.target, args));
      } catch (e) {
        this.mark(data.listener, i);
        console.error(e);
      }
      if (data.once) this.mark(data.listener, i);
    });
    this.clearMark();
    return Promise.all(results);
  }
  count() {
    return this.listeners.length;
  }
  clear() {
    this.listeners.length = 0;
    this.listenerMap.clear();
  }
  mark(listener, index) {
    this.listeners[index] = undefined;
    this.listenerMap.delete(listener);
  }
  clearMark() {
    this.listeners = this.listeners.filter(data => data);
  }
}

/***/ }),

/***/ 6886:
/*!*********************************************************!*\
  !*** ./src/ts/lib/cui/core/storage/abstract-storage.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractStroage: () => (/* binding */ AbstractStroage)
/* harmony export */ });
class AbstractStroage {
  // 時間前墜
  static #_ = this.prefix = '_DATATIME'; // 暫定一小時超時
  static #_2 = this.timeout = 60 * 60 * 1000;
  static isExist(key) {
    let storage = this.storage[key];
    return storage != undefined;
  }
  /**
   * get data by key
   * @param key
   */
  static get(key, timeout = true) {
    let storage = this.storage[key];
    if (storage) {
      if (timeout) {
        this.refreshTime(key);
      }
      return JSON.parse(storage);
    } else {
      return undefined;
    }
  }
  /**
   * set data by key
   * @param key
   * @param obj
   */
  static set(key, data, timeout = true) {
    if (data == undefined || data == null) {
      this.clean(key);
    } else {
      this.storage[key] = JSON.stringify(data);
      if (timeout) {
        this.refreshTime(key);
      }
    }
  }
  /**
   * get data by key
   * @param key
   */
  static getNoParse(key, timeout = true) {
    let storage = this.storage[key];
    if (storage) {
      if (timeout) {
        this.refreshTime(key);
      }
      return storage;
    } else {
      return undefined;
    }
  }
  /**
   * set data by key
   * @param key
   * @param obj
   */
  static setNoStringify(key, str, timeout = true) {
    if (str == undefined || str == null) {
      this.clean(key);
    } else {
      this.storage[key] = str;
      if (timeout) {
        this.refreshTime(key);
      }
    }
  }
  /**
   * 是否超時，順便清除資料
   * @param key
   */
  static isTimeout(key) {
    let dataTime = this.getTime(key);
    if (!dataTime) {
      this.clean(key);
      return true;
    }
    let checkTime = new Date().getTime() - this.timeout;
    if (checkTime - dataTime >= 0) {
      this.clean(key);
      return true;
    }
    return false;
  }
  /**
   * 取得timeout
   * @param key
   */
  static getTime(key) {
    return this.storage[key + this.prefix];
  }
  /**
   * 更新時間
   * @param key
   */
  static refreshTime(key) {
    if (this.storage[key]) {
      this.storage[key + this.prefix] = new Date().getTime();
    }
  }
  /**
   * 清除時間
   * @param key
   */
  static clean(key) {
    delete this.storage[key];
    this.cleanTime(key);
  }
  /**
   * 清除時間
   * @param key
   */
  static cleanTime(key) {
    delete this.storage[key + this.prefix];
  }
}

/***/ }),

/***/ 4047:
/*!**************************************************************!*\
  !*** ./src/ts/lib/cui/core/storage/local-storage-manager.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalStorageManager: () => (/* binding */ LocalStorageManager)
/* harmony export */ });
/* harmony import */ var _abstract_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-storage */ 6886);

class LocalStorageManager extends _abstract_storage__WEBPACK_IMPORTED_MODULE_0__.AbstractStroage {
  static #_ = this.storage = localStorage;
}

/***/ }),

/***/ 2348:
/*!****************************************************************!*\
  !*** ./src/ts/lib/cui/core/storage/session-storage-manager.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionStorageManager: () => (/* binding */ SessionStorageManager)
/* harmony export */ });
/* harmony import */ var _abstract_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-storage */ 6886);

class SessionStorageManager extends _abstract_storage__WEBPACK_IMPORTED_MODULE_0__.AbstractStroage {
  static #_ = this.storage = sessionStorage;
}

/***/ }),

/***/ 1283:
/*!*****************************************!*\
  !*** ./src/ts/translate/toolbar.key.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToolbarKey)
/* harmony export */ });
class ToolbarKey {
  static #_ = this.SureDelete = '{SureDelete}';
  /** 關鍵字*/
  static #_2 = this.Keyword = '{Keyword}';
  /** 選擇檔案*/
  static #_3 = this.SelectFiles = '{SelectFiles}';
  /** 語言*/
  static #_4 = this.Language = '{Language}';
  /** 匯入*/
  static #_5 = this.Import = '{Import}';
  /** 群組*/
  static #_6 = this.Group = '{Group}';
  /** 下載*/
  static #_7 = this.Download = '{Download}';
  /** 設定*/
  static #_8 = this.Settings = '{Settings}';
}
;

/***/ }),

/***/ 3230:
/*!*********************************************!*\
  !*** ./src/ts/translate/toolbar.sources.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toolbarSources: () => (/* binding */ toolbarSources)
/* harmony export */ });
const toolbarSources = {
  'en': {
    "SureDelete": "SureDelete",
    "Keyword": "keywords",
    "SelectFiles": "Select Files",
    "Language": "Language",
    "Import": "Import",
    "Group": "Group",
    "Download": "Download",
    "Settings": "Settings"
  },
  'zh-TW': {
    "SureDelete": "确定要删除",
    "Keyword": "關鍵字",
    "SelectFiles": "選擇檔案",
    "Language": "語言",
    "Import": "匯入",
    "Group": "群組",
    "Download": "下載",
    "Settings": "設定"
  }
};

/***/ }),

/***/ 8651:
/*!*********************************!*\
  !*** ./src/ts/util/dom-util.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DomUtil: () => (/* binding */ DomUtil)
/* harmony export */ });
class DomUtil {
  /**
   * 產生按鈕
   * @param config
   * @param level 檢查或不檢查權限等級
   */
  static buildButton(config, level) {
    let button = DomUtil.create('button');
    button.className = 'ttb-button ' + config.className || 0;
    button.addEventListener('click', config.onclick);
    button.innerText = config.text;
    return button;
  }
  static buildLinkButton(config) {
    let span = DomUtil.create('span');
    span.className = 'ttb-link-button ' + config.className || 0;
    span.addEventListener('click', config.onclick);
    span.innerText = config.text;
    return span;
  }
  static buildSpan(config) {
    let span = DomUtil.create('span');
    span.className = config.className || '';
    span.innerText = config.text;
    return span;
  }
  static buildDiv(config) {
    let div = DomUtil.create('div');
    div.className = config.className || '';
    div.innerText = config.text;
    return div;
  }
  static create(tagName) {
    return document.createElement(tagName);
  }
  static copyText(text) {
    if (text) {
      let callback = e => {
        e.clipboardData.setData('text/plain', text);
        e.preventDefault();
      };
      document.addEventListener('copy', callback);
      document.execCommand('copy', true);
      document.removeEventListener('copy', callback);
    }
  }
}

/***/ }),

/***/ 8719:
/*!*****************************!*\
  !*** ./src/ts/util/loop.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Loop)
/* harmony export */ });
class Loop {
  static of(array) {
    return new Loop(array);
  }
  constructor(array) {
    this.array = array;
    this.befores = [];
    this.afters = [];
    this.handlers = [];
  }
  call(fn) {
    if (fn instanceof Function) {
      fn(this);
    }
    return this;
  }
  before(handler) {
    if (handler instanceof Function) {
      this.befores.push(handler);
    }
    return this;
  }
  after(handler) {
    if (handler instanceof Function) {
      this.afters.push(handler);
    }
    return this;
  }
  handler(handler) {
    if (handler instanceof Function) {
      this.handlers.push(handler);
    }
    return this;
  }
  run() {
    let array = this.array;
    this.befores.forEach(handler => {
      handler(array);
    });
    if (array) {
      array.forEach((v, i, a) => {
        this.handlers.forEach((handler, j) => {
          if (handler && handler(v, i, a) == true) this.handlers[j] = undefined;
        });
      });
    }
    this.afters.forEach(handler => {
      handler(array);
    });
  }
}

/***/ }),

/***/ 9049:
/*!*************************************!*\
  !*** ./src/ts/util/sticky-table.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StickyTable: () => (/* binding */ StickyTable)
/* harmony export */ });
/* harmony import */ var ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts/lib/cui/core/decorators/delay */ 150);

let stickyCount = 0;
class StickyTable {
  constructor(table, options) {
    this.table = table;
    this.options = options;
    this.top = 0;
    this.content = '';
    this.refresh = () => {
      if (!this.table?.isConnected) return;
      this.removeEvents();
      this.top = 0;
      this.content = '';
      this.stickyHead();
      this.stickyBody();
      this.stickyFoot();
      if (this.style.innerHTML != this.content) {
        this.style.innerHTML = this.content;
      }
      this.addEvents();
    };
    this.style = document.createElement('style');
    document.head.appendChild(this.style);
    this.name = `sticky-table-${stickyCount++}`;
    this.table.classList.add(this.name);
    this.options = {
      zIndex: 3,
      refreshDelay: 100,
      ...this.options
    };
    this.refresh = (0,ts_lib_cui_core_decorators_delay__WEBPACK_IMPORTED_MODULE_0__.toDelayFn)(this.refresh, this.options.refreshDelay);
    this.refresh();
    this.addEvents();
  }
  destroy() {
    this.removeEvents();
    this.table = null;
    document.head.removeChild(this.style);
  }
  addEvents() {
    window.addEventListener('resize', this.refresh);
    window.addEventListener('mousedown', this.refresh);
  }
  removeEvents() {
    window.removeEventListener('resize', this.refresh);
    window.removeEventListener('mousedown', this.refresh);
  }
  stickyHead() {
    let thead = this.table.querySelector('thead');
    if (!thead?.isConnected) return;
    let detail = this.options.head;
    let zIndex = this.options.zIndex + 3;
    let name = `.${this.name} thead`;
    if (detail.rows) {
      let position = {
        zIndex: zIndex,
        top: 0
      };
      this.setRowSticky(detail.rows, thead, name, position);
      this.top = position.top;
    } else {
      this.top = thead.offsetHeight;
      this.setSticky(name, {
        zIndex: zIndex,
        top: 0
      });
    }
    this.setColumnSticky(detail.cols, thead, name, {
      zIndex: zIndex,
      top: 0
    });
  }
  stickyBody() {
    let tbody = this.table.querySelector('tbody');
    if (!tbody?.isConnected) return;
    let detail = this.options.body;
    let zIndex = this.options.zIndex + 1;
    let name = `.${this.name} tbody`;
    this.setRowSticky(detail.rows, tbody, name, {
      zIndex: zIndex,
      top: this.top
    });
    this.setColumnSticky(detail.cols, tbody, name, {
      zIndex: zIndex
    });
  }
  stickyFoot() {
    let tfoot = this.table.querySelector('tfoot');
    if (!tfoot?.isConnected) return;
    let detail = this.options.head;
    let zIndex = this.options.zIndex + 3;
    let name = `.${this.name} tfoot`;
    if (detail.rows) {
      let position = {
        zIndex: zIndex,
        bottom: 0
      };
      this.setRowSticky(detail.rows, tfoot, name, position);
    } else {
      this.setSticky(name, {
        zIndex: zIndex,
        bottom: 0
      });
    }
    this.setColumnSticky(detail.cols, tfoot, name, {
      zIndex: zIndex
    });
  }
  setRowSticky(rows, element, name, position) {
    if (rows == undefined) return;
    position.zIndex += 1;
    let trs;
    let increment;
    if (position.bottom != undefined) {
      trs = Array.prototype.reverse.call(element.children);
      increment = height => position.bottom += height - 1;
    } else {
      trs = Array.from(element.children);
      increment = height => position.top += height - 1;
    }
    for (let i = 0; i < trs.length; i++) {
      if (i >= rows) break;
      let tr = trs[i];
      this.setSticky(name + ` tr:nth-of-type(${i + 1})`, position);
      increment(tr.offsetHeight);
    }
  }
  setColumnSticky(cols, element, name, position) {
    if (cols == undefined) return;
    let tr = element.childNodes.item(0);
    if (!tr) return;
    let tds = tr.childNodes;
    position.left = 0;
    for (let i = 0; i < tds.length; i++) {
      if (i >= cols) break;
      let td = tds.item(i);
      this.setSticky(name + ` td:nth-of-type(${i + 1})`, position);
      this.setSticky(name + ` th:nth-of-type(${i + 1})`, position);
      position.left += td.offsetWidth;
    }
  }
  setSticky(name, position) {
    this.content += `${name} {\n`;
    this.content += ' position: sticky;\n';
    this.content += ` z-index: ${position.zIndex};\n`;
    this.content += ` left: ${position.left || 0}px;\n`;
    if (position.top != undefined) {
      this.content += ` top: ${position.top}px\n`;
    }
    if (position.bottom != undefined) {
      this.content += ` bottom: ${position.bottom}px\n`;
    }
    this.content += '}\n\n';
  }
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map