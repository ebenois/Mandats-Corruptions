const rootEndpoint = "/api";

// Model class for a politician
export class Politician {
  constructor(id, slug, fullName, firstName, lastName, civility, birthDate, deathDate, birthPlace, photoUrl, currentParty, mandates, declarations, affairsCount, factchecksCount) {
    this.id = id;
    this.slug = slug;
    this.fullName = fullName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.civility = civility;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
    this.birthPlace = birthPlace;
    this.photoUrl = photoUrl;
    this.currentParty = currentParty;
    this.mandates = mandates;
    this.declarations = declarations;
    this.affairsCount = affairsCount;
    this.factchecksCount = factchecksCount;
  }
}

class PoligraphService {

  async searchPoliticiansByName(name) {
    const response = await this.fetchFromApi(
      `${rootEndpoint}/politiques?search=${encodeURIComponent(name.trim())}`
    );
  
    if (!response || !Array.isArray(response.data)) {
      return [];
    }
  
    return this.createPoliticians(response.data);
  }

  async findPoliticianBySlug(slug) {
    const politician = await this.fetchFromApi(
      `${rootEndpoint}/politiques/${slug}`
    );

    return this.createPolitician(politician);
  }

  async fetchFromApi(query) {
  
    try {
      const response = await fetch(query);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  
      return data;
  
    } catch (e) {
      console.error("API Error:", e);
      return null;
    }
  }

  createPolitician(data) {
    return new Politician(
      data.id,
      data.slug,
      data.fullName,
      data.firstName,
      data.lastName,
      data.civility,
      data.birthDate,
      data.deathDate,
      data.birthPlace,
      data.photoUrl,
      data.currentParty,
      data.mandates,
      data.declarations,
      data.affairsCount,
      data.factchecksCount
    );
  }

  createPoliticians(list) {
    if (!Array.isArray(list)) return [];
    return list.map((p) => this.createPolitician(p));
  }
}

export default new PoligraphService();