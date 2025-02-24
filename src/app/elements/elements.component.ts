import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent {
  @Input() message: string = '';
  @Input() showAcceptCancel: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  onAccept() {
    this.accept.emit();
  }
}
