import { brregApi } from "./Axios";


export interface Postadresse {
  land?: string;
  landkode?: string;
  postnummer?: string;
  poststed?: string;
  adresse?: string[];
  kommune?: string;
  kommunenummer?: string;
}

export interface Organisasjonsform {
  kode?: string;
  beskrivelse?: string;
}

export interface BrregData {
  organisasjonsnummer: string;
  navn: string;
  postadresse?: Postadresse;
  organisasjonsform?: Organisasjonsform;
  hjemmeside?: string;
  epostadresse?: string;
}


export async function getBrregDataByOrgNumber(
  orgNumber: string
): Promise<BrregData[]> {
  try {
    const response = await brregApi.get(orgNumber);
    const data: BrregData[] = response.data._embedded?.enheter || [];
    console.log('Brreg: ', JSON.stringify(data, null, 2));
    return data;
  } catch (err) {
    console.error('Failed to fetch org data:', err);
    throw err;
  }
}

export async function searchBrregDataByName(
  name: string
): Promise<BrregData[]> {
  try {
    const response = await brregApi.get(`?navn=${encodeURIComponent(name)}`);
    const data: BrregData[] = response.data._embedded?.enheter || [];
    console.log('Brreg: ', JSON.stringify(data, null, 2));
    return data;
  } catch (err) {
    console.error('Failed to search orgs by name:', err);
    throw err;
  }
}
