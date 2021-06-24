import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'f1-language-button',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss'],
})
export class LanguageButtonComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  setLanguage(language: string) {
    this.translateService.use(language);
    localStorage.setItem('language', language);
  }

  ngOnInit(): void {}
}
