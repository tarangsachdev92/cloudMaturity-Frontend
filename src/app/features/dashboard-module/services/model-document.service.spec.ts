import { TestBed } from "@angular/core/testing";
import { ModelDocumentService } from "./model-document.service";

describe("ModelDocumentService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ModelDocumentService = TestBed.get(ModelDocumentService);
    expect(service).toBeTruthy();
  });
});
