export class ValueCache {
  values: Map<string, any>;

  constructor() {
    this.values = new Map();
  }

  cache(key: string, value: any) {
    this.values.set(key, value);
  }

  value(key: string): any | undefined {
    return this.values.get(key);
  }
}

