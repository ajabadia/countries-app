var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { finalize } from 'rxjs';
let LoginPageComponent = (() => {
    let _classDecorators = [Component({
            selector: 'app-login-page',
            standalone: true,
            imports: [CommonModule, ReactiveFormsModule, RouterModule],
            templateUrl: './login-page.component.html',
            styleUrls: ['./login-page.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LoginPageComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LoginPageComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        fb = inject(FormBuilder);
        authService = inject(AuthService);
        router = inject(Router);
        loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
        errorMessage = null;
        isLoading = false;
        onSubmit() {
            if (this.loginForm.invalid) {
                return;
            }
            this.isLoading = true;
            this.errorMessage = null;
            const credentials = this.loginForm.getRawValue();
            this.authService
                .login(credentials)
                .pipe(finalize(() => (this.isLoading = false)))
                .subscribe({
                next: () => {
                    // Navegamos al panel de administración tras un login exitoso
                    this.router.navigate(['/admin']);
                },
                error: (err) => {
                    // Mostramos un mensaje de error genérico
                    this.errorMessage =
                        err.status === 401 ? 'Credenciales inválidas.' : 'Ha ocurrido un error. Inténtelo de nuevo.';
                },
            });
        }
    };
    return LoginPageComponent = _classThis;
})();
export { LoginPageComponent };
//# sourceMappingURL=login-page.component.js.map