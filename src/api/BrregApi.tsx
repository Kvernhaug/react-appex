

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

export interface BreegData {
  organisasjonsnummer: string;
  navn: string;
  postadresse?: Postadresse;
  organisasjonsform?: Organisasjonsform;
  hjemmeside?: string;
  epostadresse?: string;
  [key: string]: any;
}


export async function getBreegDataByOrgNumber(
  orgNumber: string
): Promise<BreegData> {
  try {
    const response = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumber}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();

    // Normalize to BreegData format
    const data: BreegData = {
      organisasjonsnummer: json.organisasjonsnummer,
      navn: json.navn,
      postadresse: json.postadresse,
      organisasjonsform: json.organisasjonsform,
      hjemmeside: json.hjemmeside,
      epostadresse: json.epostadresse,
      ...json,
    };

    return data;
  } catch (err) {
    console.error('Failed to fetch org data:', err);
    throw err;
  }
}

export async function searchBreegDataByName(
  name: string
): Promise<BreegData[]> {
  try {
    const response = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(
        name
      )}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();

    if (!json._embedded?.enheter) {
      return [];
    }

    // Map API data to BreegData[]
    return json._embedded.enheter.map((data: any) => ({
      organisasjonsnummer: data.organisasjonsnummer,
      navn: data.navn,
      postadresse: data.postadresse,
      organisasjonsform: data.organisasjonsform,
      hjemmeside: data.hjemmeside,
      epostadresse: data.epostadresse,
      ...data,
    }));
  } catch (err) {
    console.error('Failed to search orgs by name:', err);
    throw err;
  }
}
