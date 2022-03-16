import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'f1-rules-overview-page',
  templateUrl: './rules-overview-page.component.html',
  styleUrls: ['./rules-overview-page.component.scss'],
})
export class RulesOverviewPageComponent implements OnInit {
  public rulesSections: Array<string>;

  constructor(translateService: TranslateService) {
    let currentLanguage = translateService.currentLang;
    this.rulesSections = new Array<string>();
    this.rulesSections.push(`assets/game-rules/${currentLanguage}/general.md`);
    this.rulesSections.push(`assets/game-rules/${currentLanguage}/team.md`);
    this.rulesSections.push(`assets/game-rules/${currentLanguage}/money.md`);
    this.rulesSections.push(`assets/game-rules/${currentLanguage}/points.md`);
    this.rulesSections.push(`assets/game-rules/${currentLanguage}/weardown.md`);
    this.rulesSections.push(`assets/game-rules/${currentLanguage}/locks.md`);
  }

  ngOnInit(): void {}
}
