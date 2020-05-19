import patientReducer from '../../reducers/patientReducer';

const initialState = {
  list: [],
  status: 0,
  vitalSigns: {},
  vitalSignsList: [],
  allergies: {},
  patient: {},
  previousMedications: [],
  encounters: [],
  exclusiveEncounters: [],
  previousTestOrders: [],
};

describe('Test Suite for Patient Reducer', () => {
    it('should set default state', () => {
         const state = patientReducer(initialState, { type: "@@INIT" });
         expect(state).toEqual(initialState);
    });

    it('should set list field in state object to action payload', () => {
        const action = { type: 'PATIENTS_FETCH_ALL', payload: [] };
        const state = patientReducer(initialState, action);
        expect(state.list).toEqual([])
    });

    it('should set patient field in state object to action payload', () => {
        const action = { type: "PATIENTS_FETCH_BY_ID", payload: [] };
        const state = patientReducer(initialState, action);
        expect(state.patient).toEqual([]);
    });

    it("should not set status field in state object to action payload", () => {
      const action = { type: "PATIENTS_CREATE", payload: [] };
      const state = patientReducer(initialState, action);
      expect(state.status).not.toEqual(['a', 'b', 'c']);
    });

    it("should set status field in state object to action payload", () => {
      const action = { type: "PATIENTS_CREATE", payload: [] };
      const state = patientReducer(initialState, action);
      expect(state.status).toEqual([]);
    });

    it("should set error message field in state object to action payload", () => {
      const action = { type: "PATIENTS_ERROR", payload: [] };
      const state = patientReducer(initialState, action);
      expect(state.errormsg).not.toEqual(["a", "b", "c"]);
    });

    it('should set the updated field in state object to action payload', () => {
        const action = { type: 'PATIENTS_UPDATE', payload: ['a', 'b', 'c'] };
        const state = patientReducer(initialState, action);
        expect(state.updated).not.toEqual([]);
    });
})