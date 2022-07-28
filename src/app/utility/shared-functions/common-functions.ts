import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import { AssessmentCriteriaStatusEnum, DocumentViewTypeEnum, imgExtensions } from '../shared-constants';

export const isEmpty = (obj): boolean =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const AppLogger = (value: any) => {
  // console.log(`<------------------------------------ ${value} ------------------------------------>`);
};

export const saveFile = (response, fileName) => {
  FileSaver.saveAs(response, fileName);
};

export const addElement = (i?: number) => {
  return {
    Description: `${i ? `Domain ${i}` : `New Domain`}`,
    Comment: '',
    AttachementControl: 4,
    Attachment: [],
    Scores: [
      { Description: 'Score 1', Note: 1, Selected: false },
      { Description: 'Score 2', Note: 2, Selected: false },
      { Description: 'Score 3', Note: 3, Selected: false },
      { Description: 'Score 4', Note: 4, Selected: false },
      { Description: 'Score 5', Note: 5, Selected: false }
    ]
  };
};

export const getInitials = (fromStr: string, upTo = 2): string => {
  const initials = (fromStr && fromStr.match(/\b\w/g)) || [];
  const toStr = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return toStr;
};

export const prepareOrganisationTreeData = (arrList, isWholeDataAsKey = false) => {
  return arrList.map(elem => {
    let mapElement: any = {};

    const data = elem;
    const title = elem.org_name;
    const subOrganizations = elem.subOrganizations;

    mapElement = { title, value: data, key: isWholeDataAsKey ? data : data._id, children: [] };

    if (subOrganizations && subOrganizations.length > 0) {
      mapElement.children = prepareOrganisationTreeData(
        subOrganizations, isWholeDataAsKey
      );
    } else {
      mapElement.isLeaf = true;
    }
    return mapElement;
  });
};

export const prepareElementsTreeData = (arrList, isWholeDataAsKey = false) => {
  return arrList.map(elem => {
    let mapElement: any = {};
    const data = elem.element_id;
    const title = elem.element_name;
    const subElements = elem.subElements;
    mapElement = { title, value: data, key: isWholeDataAsKey ? data : data._id, children: [] };
    if (subElements && subElements.length > 0) {
      mapElement.children = prepareElementsTreeData(
        subElements, isWholeDataAsKey
      );
    } else {
      mapElement.isLeaf = true;
    }
    return mapElement;
  });
};

export const isObject = (a) => {
  return !!a && a.constructor === Object;
};

export const checkWeight = () => {

};

export const retrieveWeight = (weight): number => {
  let w;
  if (typeof weight === 'number' || typeof weight === 'string') {
    w = weight;
  } else if (isObject(weight)) {
    w = weight.$numberDecimal;
  }
  return +w;
};


export const retrieveScore = (score): number => {
  let w;
  if (typeof score === 'number' || typeof score === 'string') {
    w = score;
  } else if (isObject(score)) {
    w = score.$numberDecimal;
  }
  return (+w || 0);
};

export const getLevelList = (maxLevel: number): any[] => {
  const levels = [];
  for (let i = 1; i <= maxLevel; i++) {
    levels.push({ value: i, display: `Level ${i}` });
  }
  return JSON.parse(JSON.stringify(levels));
};

export const makeId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


// for (let i = 0; i < 10; i++) {
//   const element_name = `ELEM-${makeId(2)}`;
//   const description = `this is the description for the ELEM-${makeId(4)} ${makeId(8)} ${makeId(7)}`;
//   const newParams = { element_name, description, model_id: this.assessmentModel._id };
//   this.createElement(newParams).subscribe(response => {
//     const createdElement = response.payload.element;
//     this.elementList.push(createdElement);
//     this.elementSelect.emit({ element: this.elementList[this.currentIndex] });
//     this.onSaveElementSuccess();
//   }, e => { });
// }

// for (let i = 0; i < 10; i++) {
//   const element_name = `SUB_ELEMN_ELEM-${makeId(2)}`;
//   const description = `this is the description for the SUB_ELEMN_ELEM-${makeId(4)} ${makeId(8)} ${makeId(7)}`;
//   const newParams = { element_name, description, parent_element_id: this.parentElementId };
//   this.createSubElement(newParams).subscribe(response => {
//     const createdElement = response.payload.subElement;
//     this.subElementList.push(createdElement);
//   }, e => { });
// }

export const countPercentage = (value: number, maxValue) => {
  return (100 * value) / maxValue;
};

export const formatDecimal = (value: number) => {
  const decimals = value.toString().split('.')[1];
  return decimals && decimals.length > 2 ? value.toFixed(2) : value
}

export const isCriteriaImplemented = (status) => {
  return status === AssessmentCriteriaStatusEnum.IMPLEMENTED;
}

export const isCriteriaPartiallyImplemented = (status) => {
  return status === AssessmentCriteriaStatusEnum.PARTIALLY_IMPLEMENTED;
}

export const isCriteriaNotImplemented = (status) => {
  return status === AssessmentCriteriaStatusEnum.NOT_IMPLEMENTED;
}

export const isCriteriaNotRated = (status) => {
  return status === AssessmentCriteriaStatusEnum.NOT_RATED;
}

export const formatDateString = (dateString, format = 'DD-MM-YYYY') => {
  return dateString ? moment(dateString).format(format) : '';
};

export const removeBlankValue = (params = {}) => {
  const obj = { ...params };
  Object.keys(obj).forEach((key) => !obj[key] && delete obj[key])
  return obj;
};

// export const countPercentage = (value: number, total: number) => {
//   return 100 * value / total
// }

export const getDocType = (fileName: string): DocumentViewTypeEnum => {
  const fileURL = fileName.split('?')[0];
  const extension = fileURL.split('.').pop();
  let docType = DocumentViewTypeEnum.DOC;

  if (imgExtensions.indexOf(extension) > -1) {
    docType = DocumentViewTypeEnum.IMG;
  }
  return docType;
}