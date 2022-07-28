import { Injectable } from "@angular/core";
import { ModelDetailEnum } from "../shared-constants";

@Injectable()
export class UtilityService {
  private modelDetailTabIndex: ModelDetailEnum = ModelDetailEnum.BASIC_DATA;

  constructor() {
  }

  setModelDetailTabIndex(value: ModelDetailEnum): void {
    this.modelDetailTabIndex = value;
  }

  getModelDetailTabIndex(): ModelDetailEnum {
    return this.modelDetailTabIndex;
  }

}
