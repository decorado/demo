(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{seP3:function(e,t,n){"use strict";n.d(t,"e",function(){return L}),n.d(t,"b",function(){return _}),n.d(t,"a",function(){return O}),n.d(t,"c",function(){return v}),n.d(t,"d",function(){return f}),n.d(t,"f",function(){return y}),n.d(t,"g",function(){return g});var i=n("CcnG"),a=(n("ihYY"),n("mrSG")),r=n("n6gG"),o=n("Wf4p"),l=n("K9Ia"),s=n("p0ib"),h=n("bne5"),c=n("p0Sj"),u=n("ny24"),d=n("t9fZ"),p=0,_=function(){return function(){this.id="mat-error-"+p++}}(),f=function(){};function b(e){return Error("A hint was already declared for 'align=\""+e+"\"'.")}var y=function(){},g=function(){},m=0,C=Object(o.B)(function(e){this._elementRef=e},"primary"),O=new i.InjectionToken("MAT_FORM_FIELD_DEFAULT_OPTIONS"),v=function(e){function t(t,n,i,a,r,o,s,h){var c=e.call(this,t)||this;return c._elementRef=t,c._changeDetectorRef=n,c._dir=a,c._defaults=r,c._platform=o,c._ngZone=s,c._outlineGapCalculationNeededImmediately=!1,c._outlineGapCalculationNeededOnStable=!1,c._destroyed=new l.a,c._showAlwaysAnimate=!1,c._subscriptAnimationState="",c._hintLabel="",c._hintLabelId="mat-hint-"+m++,c._labelId="mat-form-field-label-"+m++,c._labelOptions=i||{},c.floatLabel=c._labelOptions.float||"auto",c._animationsEnabled="NoopAnimations"!==h,c.appearance=r&&r.appearance?r.appearance:"legacy",c}return Object(a.__extends)(t,e),Object.defineProperty(t.prototype,"appearance",{get:function(){return this._appearance},set:function(e){var t=this._appearance;this._appearance=e||this._defaults&&this._defaults.appearance||"legacy","outline"===this._appearance&&t!==e&&this._updateOutlineGapOnStable()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hideRequiredMarker",{get:function(){return this._hideRequiredMarker},set:function(e){this._hideRequiredMarker=Object(r.b)(e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_shouldAlwaysFloat",{get:function(){return"always"===this.floatLabel&&!this._showAlwaysAnimate},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_canLabelFloat",{get:function(){return"never"!==this.floatLabel},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hintLabel",{get:function(){return this._hintLabel},set:function(e){this._hintLabel=e,this._processHints()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"floatLabel",{get:function(){return"legacy"!==this.appearance&&"never"===this._floatLabel?"auto":this._floatLabel},set:function(e){e!==this._floatLabel&&(this._floatLabel=e||this._labelOptions.float||"auto",this._changeDetectorRef.markForCheck())},enumerable:!0,configurable:!0}),t.prototype.getConnectedOverlayOrigin=function(){return this._connectionContainerRef||this._elementRef},t.prototype.ngAfterContentInit=function(){var e=this;this._validateControlChild();var t=this._control;t.controlType&&this._elementRef.nativeElement.classList.add("mat-form-field-type-"+t.controlType),t.stateChanges.pipe(Object(c.a)(null)).subscribe(function(){e._validatePlaceholders(),e._syncDescribedByIds(),e._changeDetectorRef.markForCheck()}),t.ngControl&&t.ngControl.valueChanges&&t.ngControl.valueChanges.pipe(Object(u.a)(this._destroyed)).subscribe(function(){return e._changeDetectorRef.markForCheck()}),this._ngZone&&this._ngZone.onStable.asObservable().pipe(Object(u.a)(this._destroyed)).subscribe(function(){e._outlineGapCalculationNeededOnStable&&e.updateOutlineGap()}),Object(s.a)(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(function(){e._updateOutlineGapOnStable(),e._changeDetectorRef.markForCheck()}),this._hintChildren.changes.pipe(Object(c.a)(null)).subscribe(function(){e._processHints(),e._changeDetectorRef.markForCheck()}),this._errorChildren.changes.pipe(Object(c.a)(null)).subscribe(function(){e._syncDescribedByIds(),e._changeDetectorRef.markForCheck()}),this._dir&&this._dir.change.pipe(Object(u.a)(this._destroyed)).subscribe(function(){return e.updateOutlineGap()})},t.prototype.ngAfterContentChecked=function(){this._validateControlChild(),this._outlineGapCalculationNeededImmediately&&this.updateOutlineGap()},t.prototype.ngAfterViewInit=function(){this._subscriptAnimationState="enter",this._changeDetectorRef.detectChanges()},t.prototype.ngOnDestroy=function(){this._destroyed.next(),this._destroyed.complete()},t.prototype._shouldForward=function(e){var t=this._control?this._control.ngControl:null;return t&&t[e]},t.prototype._hasPlaceholder=function(){return!!(this._control&&this._control.placeholder||this._placeholderChild)},t.prototype._hasLabel=function(){return!!this._labelChild},t.prototype._shouldLabelFloat=function(){return this._canLabelFloat&&(this._control.shouldLabelFloat||this._shouldAlwaysFloat)},t.prototype._hideControlPlaceholder=function(){return"legacy"===this.appearance&&!this._hasLabel()||this._hasLabel()&&!this._shouldLabelFloat()},t.prototype._hasFloatingLabel=function(){return this._hasLabel()||"legacy"===this.appearance&&this._hasPlaceholder()},t.prototype._getDisplayedMessages=function(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"},t.prototype._animateAndLockLabel=function(){var e=this;this._hasFloatingLabel()&&this._canLabelFloat&&(this._animationsEnabled&&(this._showAlwaysAnimate=!0,Object(h.a)(this._label.nativeElement,"transitionend").pipe(Object(d.a)(1)).subscribe(function(){e._showAlwaysAnimate=!1})),this.floatLabel="always",this._changeDetectorRef.markForCheck())},t.prototype._validatePlaceholders=function(){if(this._control.placeholder&&this._placeholderChild)throw Error("Placeholder attribute and child element were both specified.")},t.prototype._processHints=function(){this._validateHints(),this._syncDescribedByIds()},t.prototype._validateHints=function(){var e,t,n=this;this._hintChildren&&this._hintChildren.forEach(function(i){if("start"===i.align){if(e||n.hintLabel)throw b("start");e=i}else if("end"===i.align){if(t)throw b("end");t=i}})},t.prototype._syncDescribedByIds=function(){if(this._control){var e=[];if("hint"===this._getDisplayedMessages()){var t=this._hintChildren?this._hintChildren.find(function(e){return"start"===e.align}):null,n=this._hintChildren?this._hintChildren.find(function(e){return"end"===e.align}):null;t?e.push(t.id):this._hintLabel&&e.push(this._hintLabelId),n&&e.push(n.id)}else this._errorChildren&&(e=this._errorChildren.map(function(e){return e.id}));this._control.setDescribedByIds(e)}},t.prototype._validateControlChild=function(){if(!this._control)throw Error("mat-form-field must contain a MatFormFieldControl.")},t.prototype.updateOutlineGap=function(){var e=this._label?this._label.nativeElement:null;if("outline"===this.appearance&&e&&e.children.length&&e.textContent.trim()&&(!this._platform||this._platform.isBrowser))if(document.documentElement.contains(this._elementRef.nativeElement)){var t=0,n=0,i=this._connectionContainerRef.nativeElement,a=i.querySelectorAll(".mat-form-field-outline-start"),r=i.querySelectorAll(".mat-form-field-outline-gap");if(this._label&&this._label.nativeElement.children.length){var o=i.getBoundingClientRect();if(0===o.width&&0===o.height)return this._outlineGapCalculationNeededOnStable=!0,void(this._outlineGapCalculationNeededImmediately=!1);for(var l=this._getStartEnd(o),s=this._getStartEnd(e.children[0].getBoundingClientRect()),h=0,c=0,u=e.children;c<u.length;c++)h+=u[c].offsetWidth;t=s-l-5,n=h>0?.75*h+10:0}for(var d=0;d<a.length;d++)a.item(d).style.width=t+"px";for(d=0;d<r.length;d++)r.item(d).style.width=n+"px";this._outlineGapCalculationNeededOnStable=this._outlineGapCalculationNeededImmediately=!1}else this._outlineGapCalculationNeededImmediately=!0},t.prototype._getStartEnd=function(e){return this._dir&&"rtl"===this._dir.value?e.right:e.left},t.prototype._updateOutlineGapOnStable=function(){var e=this;this._ngZone?this._outlineGapCalculationNeededOnStable=!0:Promise.resolve().then(function(){return e.updateOutlineGap()})},t}(C),L=function(){}}}]);