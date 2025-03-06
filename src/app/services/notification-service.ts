import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmissionPatternService {
  private patternSource = new BehaviorSubject<string>(''); // Store the pattern
  currentPattern = this.patternSource.asObservable(); // Observable for the pattern

  changePattern(pattern: string) {
    this.patternSource.next(pattern); // Update the pattern
  }
}
