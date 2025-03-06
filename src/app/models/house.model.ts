export class House {
    id: string;
    houseName: string;
    houseNumber: string;
    houseSex: string;
    houseMaster: string;
    houseMistress: string;
    assistantHouseMaster: string;
    assistantHouseMistress: string;

    constructor(payload?: House) {
        this.id = payload?.id || '';
        this.houseName = payload?.houseName || '';
        this.houseNumber = payload?.houseNumber || '';
        this.houseSex = payload?.houseSex || '';
        this.houseMaster = payload?.houseMaster || '';
        this.houseMistress = payload?.houseMistress || '';
        this.assistantHouseMaster = payload?.assistantHouseMaster || '';
        this.assistantHouseMistress = payload?.assistantHouseMistress || '';
    }
}
