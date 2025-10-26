import {
  BrowserAnimationsModule,
  NzIconModule,
  Router,
  RouterOutlet,
  bootstrapApplication,
  importProvidersFrom,
  provideHttpClient,
  provideRouter,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵinject
} from "./chunk-C7BHRDSY.js";

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  title = "inventario-peru-smart";
  static \u0275fac = function AppComponent_Factory(t) {
    return new (t || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 11 });
})();

// src/app/auth/guards/auth.guard.ts
var AuthGuard = class _AuthGuard {
  router;
  constructor(router) {
    this.router = router;
  }
  canActivate() {
    const isLogged = localStorage.getItem("isLogged") === "true";
    if (isLogged) {
      return true;
    }
    return this.router.createUrlTree(["/auth/login"]);
  }
  static \u0275fac = function AuthGuard_Factory(t) {
    return new (t || _AuthGuard)(\u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthGuard, factory: _AuthGuard.\u0275fac, providedIn: "root" });
};

// src/app/auth/guards/public.guard.ts
var PublicGuard = class _PublicGuard {
  router;
  constructor(router) {
    this.router = router;
  }
  canActivate() {
    const isLogged = localStorage.getItem("isLogged") === "true";
    if (isLogged) {
      return this.router.createUrlTree(["/productos/listar"]);
    }
    return true;
  }
  static \u0275fac = function PublicGuard_Factory(t) {
    return new (t || _PublicGuard)(\u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PublicGuard, factory: _PublicGuard.\u0275fac, providedIn: "root" });
};

// src/app/app.routes.ts
var routes = [
  {
    path: "auth",
    canActivate: [PublicGuard],
    loadChildren: () => import("./chunk-A5MAGCUM.js").then((m) => m.AUTH_ROUTES)
  },
  {
    path: "productos",
    canActivate: [AuthGuard],
    loadChildren: () => import("./chunk-37GSLS6V.js").then((m) => m.PRODUCTOS_ROUTES)
  },
  { path: "", redirectTo: "auth", pathMatch: "full" },
  { path: "**", redirectTo: "auth" }
];

// src/main.ts
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(NzIconModule),
    provideHttpClient(),
    provideRouter(routes)
  ]
});
//# sourceMappingURL=main.js.map
