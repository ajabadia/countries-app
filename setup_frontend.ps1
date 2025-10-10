# setup_frontend_final.ps1
# NO más here-strings problemáticos. Solo Out-File con UTF8.
$ErrorActionPreference = "Stop"

function Run-Ng { param([string]$ArgsLine) cmd /c "npx -y @angular/cli $ArgsLine" }
function Wait-ForPath { param([string]$Path,[int]$TimeoutMs=15000)
  $t=0; while(-not (Test-Path $Path) -and $t -lt $TimeoutMs){ Start-Sleep -Milliseconds 200; $t+=200 }
  if(-not (Test-Path $Path)){ throw "No se creó: $Path" }
}

Write-Host "== 0) Crear Angular 'frontend' ==" -ForegroundColor Cyan
if (Test-Path .\frontend) { Remove-Item -Recurse -Force .\frontend }
Run-Ng "new frontend --routing --style=scss --skip-git"
Wait-ForPath ".\frontend\src\app\app.module.ts"
Set-Location frontend

Write-Host "== 1) Generar estructura ==" -ForegroundColor Cyan
Run-Ng "g module modules/shared"
Wait-ForPath ".\src\app\modules\shared\shared.module.ts"
Run-Ng "g module modules/public --route public --module app"
Wait-ForPath ".\src\app\modules\public\public.module.ts"
Run-Ng "g service modules/shared/services/country"
Wait-ForPath ".\src\app\modules\shared\services\country.service.ts"
Run-Ng "g service modules/shared/services/area"
Wait-ForPath ".\src\app\modules\shared\services\area.service.ts"
Run-Ng "g component modules/shared/components/table --inline-style --inline-template"
Wait-ForPath ".\src\app\modules\shared\components\table\table.component.ts"
Run-Ng "g component modules/shared/components/search-box --inline-style --inline-template"
Wait-ForPath ".\src\app\modules\shared\components\search-box\search-box.component.ts"

Write-Host "== 2) app.module.ts ==" -ForegroundColor Cyan
"import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}" | Out-File -FilePath ".\src\app\app.module.ts" -Encoding UTF8

Write-Host "== 3) environment.ts ==" -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path .\src\environments | Out-Null
"export const environment = { production: false, apiBase: 'http://localhost:3000/api' };" | Out-File -FilePath ".\src\environments\environment.ts" -Encoding UTF8

Write-Host "== 4) SharedModule ==" -ForegroundColor Cyan
"import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

@NgModule({
  declarations: [TableComponent, SearchBoxComponent],
  imports: [CommonModule],
  exports: [TableComponent, SearchBoxComponent]
})
export class SharedModule {}" | Out-File -FilePath ".\src\app\modules\shared\shared.module.ts" -Encoding UTF8

Write-Host "== 5) PublicModule importa Shared ==" -ForegroundColor Cyan
$publicModule = Get-Content .\src\app\modules\public\public.module.ts -Raw
$publicModule = $publicModule -replace "from '@angular/core';", "from '@angular/core';`nimport { SharedModule } from '../shared/shared.module';"
$publicModule = $publicModule -replace "imports:\s*\[", "imports: [ SharedModule, "
$publicModule | Out-File -FilePath ".\src\app\modules\public\public.module.ts" -Encoding UTF8

Write-Host "== 6) CountryService ==" -ForegroundColor Cyan
"import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(private http: HttpClient) {}

  list(opts: any = {}) {
    let params = new HttpParams();
    Object.entries(opts).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params = params.set(k, String(v));
    });
    return this.http.get(environment.apiBase + '/countries', { params });
  }

  get(id: string, lang?: string) {
    const options: any = {};
    if (lang) options.params = { lang };
    return this.http.get(environment.apiBase + '/countries/' + id, options);
  }
}" | Out-File -FilePath ".\src\app\modules\shared\services\country.service.ts" -Encoding UTF8

Write-Host "== 7) AreaService ==" -ForegroundColor Cyan
"import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AreaService {
  constructor(private http: HttpClient) {}
  list() { return this.http.get(environment.apiBase + '/areas'); }
}" | Out-File -FilePath ".\src\app\modules\shared\services\area.service.ts" -Encoding UTF8

Write-Host "== 8) Table component ==" -ForegroundColor Cyan
"<div class='table'>
  <table>
    <thead><tr><th>Country</th><th>Code</th></tr></thead>
    <tbody>
      <tr *ngFor='let c of data'>
        <td>{{ c.name }}</td>
        <td>{{ c.alpha2 }}</td>
      </tr>
    </tbody>
  </table>
</div>" | Out-File -FilePath ".\src\app\modules\shared\components\table\table.component.html" -Encoding UTF8

"import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: []
})
export class TableComponent {
  @Input() data: any[] = [];
}" | Out-File -FilePath ".\src\app\modules\shared\components\table\table.component.ts" -Encoding UTF8

Write-Host "== 9) SearchBox component ==" -ForegroundColor Cyan
"<input type='search' placeholder='Search...' (input)='onInput($event)' />" | Out-File -FilePath ".\src\app\modules\shared\components\search-box\search-box.component.html" -Encoding UTF8

"import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: []
})
export class SearchBoxComponent {
  @Output() search = new EventEmitter<string>();
  onInput(ev: Event) { const v = (ev.target as HTMLInputElement).value; this.search.emit(v); }
}" | Out-File -FilePath ".\src\app\modules\shared\components\search-box\search-box.component.ts" -Encoding UTF8

Write-Host "== 10) CountryList page ==" -ForegroundColor Cyan
Run-Ng "g component modules/public/pages/country-list --inline-style --inline-template"
Wait-ForPath ".\src\app\modules\public\pages\country-list\country-list.component.ts"

"<div>
  <h2>Countries</h2>
  <app-search-box (search)='onSearch($event)'></app-search-box>
  <app-table [data]='countries'></app-table>
  <div>Total: {{ total }}</div>
</div>" | Out-File -FilePath ".\src\app\modules\public\pages\country-list\country-list.component.html" -Encoding UTF8

"import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../../shared/services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: []
})
export class CountryListComponent implements OnInit {
  countries: any[] = [];
  total = 0;
  q = '';

  constructor(private country: CountryService) {}

  ngOnInit() { this.load(); }

  onSearch(q: string) {
    this.q = q || '';
    this.load();
  }

  load() {
    this.country.list({ search: this.q, limit: 20, offset: 0 })
      .subscribe((res: any) => { this.countries = res.items; this.total = res.total; });
  }
}" | Out-File -FilePath ".\src\app\modules\public\pages\country-list\country-list.component.ts" -Encoding UTF8

Write-Host "== 11) Redirección a /public ==" -ForegroundColor Cyan
$appRouting = Get-Content .\src\app\app-routing.module.ts -Raw
if ($appRouting -notmatch "redirectTo: 'public'") {
  $appRouting = $appRouting -replace "const routes: Routes = \[", "const routes: Routes = [ { path: '', pathMatch: 'full', redirectTo: 'public' },"
  $appRouting | Out-File -FilePath ".\src\app\app-routing.module.ts" -Encoding UTF8
}

Write-Host "== 12) Arrancar ==" -ForegroundColor Cyan
cmd /c "npx ng serve -o"
