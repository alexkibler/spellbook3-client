import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpellbookService } from '../shared/spellbook.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit {
  id: number;
  private sub: any;
  public form: FormGroup;

  constructor(
    private spellbookService: SpellbookService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
  }

  addClass() {
    // nothing yet
  }

}
