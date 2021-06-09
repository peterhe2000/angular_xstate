import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { InterpretedService } from '../../../shared/services/sstStateMachineTypes';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserListStateService: InterpretedService<any, any, any>;

  describe('userListMachine', () => {
    let currentState;
    beforeEach(() => {
      mockUserListStateService.state$.subscribe((state) => {
        currentState = state;
      });
    })

    it('paused state should work', () => {
      component.ngOnInit();
      mockUserListStateService.send({ type: 'TOGGLE' });
      expect(currentState.matches('running')).toBe(true);
      mockUserListStateService.send({ type: 'TOGGLE' });
      expect(currentState.matches('paused')).toBe(true);
      mockUserListStateService.send({ type: 'RESET' });
      expect(currentState.matches('idle')).toBe(true);
    });

    it('running state should work', () => {
      component.ngOnInit();
      mockUserListStateService.send({ type: 'TOGGLE' });
      expect(currentState.matches('running')).toBe(true);
      mockUserListStateService.send({ type: 'TOGGLE' });
      expect(currentState.matches('paused')).toBe(true);
      mockUserListStateService.send({ type: 'TOGGLE' });
      expect(currentState.matches('running')).toBe(true);
    });
  });

  describe('onOptionChange', () => {
    it('should call send toggle', function() {
      const sendSpy = spyOn(component.userListStateService,'send');
      component.onOptionChange(null);
      expect(sendSpy).toHaveBeenCalledWith({ type: 'TOGGLE' });
    });
  });

  describe('currentState', () => {
    describe('and when given event Toggle', () => {
      it('should return running', fakeAsync(() => {
        component.ngOnInit();
        mockUserListStateService.send({ type: 'TOGGLE' });
        tick();
        expect(component.currentState.matches('running')).toBe(true);
      }));
    });

    describe('and when given event Toggle then Toggle', () => {
      it('should return paused', fakeAsync(() => {
        component.ngOnInit();
        mockUserListStateService.send({ type: 'TOGGLE' });
        mockUserListStateService.send({ type: 'TOGGLE' });
        tick();
        expect(component.currentState.matches('paused')).toBe(true);
      }));
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .overrideTemplate(UserListComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    mockUserListStateService = component.userListStateService;
    fixture.detectChanges();
  });
});
