import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ListingMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Listing {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly date?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Listing, ListingMetaData>);
  static copyOf(source: Listing, mutator: (draft: MutableModel<Listing, ListingMetaData>) => MutableModel<Listing, ListingMetaData> | void): Listing;
}