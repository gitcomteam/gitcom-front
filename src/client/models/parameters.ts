/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";

export const accessToken: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "accessToken"
  ],
  mapper: {
    serializedName: "access_token",
    type: {
      name: "String"
    }
  }
};
export const address: msRest.OperationQueryParameter = {
  parameterPath: "address",
  mapper: {
    required: true,
    serializedName: "address",
    type: {
      name: "String"
    }
  }
};
export const alias: msRest.OperationQueryParameter = {
  parameterPath: "alias",
  mapper: {
    required: true,
    serializedName: "alias",
    type: {
      name: "String"
    }
  }
};
export const amount: msRest.OperationQueryParameter = {
  parameterPath: "amount",
  mapper: {
    required: true,
    serializedName: "amount",
    type: {
      name: "Number"
    }
  }
};
export const apiToken: msRest.OperationQueryParameter = {
  parameterPath: "apiToken",
  mapper: {
    required: true,
    serializedName: "api_token",
    type: {
      name: "String"
    }
  }
};
export const boardGuid: msRest.OperationQueryParameter = {
  parameterPath: "boardGuid",
  mapper: {
    required: true,
    serializedName: "board_guid",
    type: {
      name: "String"
    }
  }
};
export const cardGuid: msRest.OperationQueryParameter = {
  parameterPath: "cardGuid",
  mapper: {
    required: true,
    serializedName: "card_guid",
    type: {
      name: "String"
    }
  }
};
export const code: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "code"
  ],
  mapper: {
    serializedName: "code",
    type: {
      name: "String"
    }
  }
};
export const columnGuid0: msRest.OperationQueryParameter = {
  parameterPath: "columnGuid",
  mapper: {
    required: true,
    serializedName: "column_guid",
    type: {
      name: "String"
    }
  }
};
export const columnGuid1: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "columnGuid"
  ],
  mapper: {
    serializedName: "column_guid",
    type: {
      name: "String"
    }
  }
};
export const columnOrder: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "columnOrder"
  ],
  mapper: {
    serializedName: "column_order",
    type: {
      name: "Number"
    }
  }
};
export const confirmationKey: msRest.OperationQueryParameter = {
  parameterPath: "confirmationKey",
  mapper: {
    required: true,
    serializedName: "confirmation_key",
    type: {
      name: "String"
    }
  }
};
export const currencyType: msRest.OperationQueryParameter = {
  parameterPath: "currencyType",
  mapper: {
    required: true,
    serializedName: "currency_type",
    type: {
      name: "String"
    }
  }
};
export const description0: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "description"
  ],
  mapper: {
    serializedName: "description",
    type: {
      name: "String"
    }
  }
};
export const description1: msRest.OperationQueryParameter = {
  parameterPath: "description",
  mapper: {
    required: true,
    serializedName: "description",
    type: {
      name: "String"
    }
  }
};
export const durationHours: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "durationHours"
  ],
  mapper: {
    serializedName: "duration_hours",
    type: {
      name: "Number"
    }
  }
};
export const email0: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "email"
  ],
  mapper: {
    serializedName: "email",
    type: {
      name: "String"
    }
  }
};
export const email1: msRest.OperationQueryParameter = {
  parameterPath: "email",
  mapper: {
    required: true,
    serializedName: "email",
    type: {
      name: "String"
    }
  }
};
export const entityGuid: msRest.OperationQueryParameter = {
  parameterPath: "entityGuid",
  mapper: {
    required: true,
    serializedName: "entity_guid",
    type: {
      name: "String"
    }
  }
};
export const entityType: msRest.OperationQueryParameter = {
  parameterPath: "entityType",
  mapper: {
    required: true,
    serializedName: "entity_type",
    type: {
      name: "String"
    }
  }
};
export const facebookToken: msRest.OperationQueryParameter = {
  parameterPath: "facebookToken",
  mapper: {
    required: true,
    serializedName: "facebook_token",
    type: {
      name: "String"
    }
  }
};
export const googleToken: msRest.OperationQueryParameter = {
  parameterPath: "googleToken",
  mapper: {
    required: true,
    serializedName: "google_token",
    type: {
      name: "String"
    }
  }
};
export const invoiceGuid: msRest.OperationQueryParameter = {
  parameterPath: "invoiceGuid",
  mapper: {
    required: true,
    serializedName: "invoice_guid",
    type: {
      name: "String"
    }
  }
};
export const key: msRest.OperationQueryParameter = {
  parameterPath: "key",
  mapper: {
    required: true,
    serializedName: "key",
    type: {
      name: "String"
    }
  }
};
export const login: msRest.OperationQueryParameter = {
  parameterPath: "login",
  mapper: {
    required: true,
    serializedName: "login",
    type: {
      name: "String"
    }
  }
};
export const name0: msRest.OperationQueryParameter = {
  parameterPath: "name",
  mapper: {
    required: true,
    serializedName: "name",
    type: {
      name: "String"
    }
  }
};
export const name1: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "name"
  ],
  mapper: {
    serializedName: "name",
    type: {
      name: "String"
    }
  }
};
export const originId: msRest.OperationQueryParameter = {
  parameterPath: "originId",
  mapper: {
    required: true,
    serializedName: "origin_id",
    type: {
      name: "String"
    }
  }
};
export const owner: msRest.OperationQueryParameter = {
  parameterPath: "owner",
  mapper: {
    required: true,
    serializedName: "owner",
    type: {
      name: "String"
    }
  }
};
export const page: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "page"
  ],
  mapper: {
    serializedName: "page",
    type: {
      name: "Number"
    }
  }
};
export const password0: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "password"
  ],
  mapper: {
    serializedName: "password",
    type: {
      name: "String"
    }
  }
};
export const password1: msRest.OperationQueryParameter = {
  parameterPath: "password",
  mapper: {
    required: true,
    serializedName: "password",
    type: {
      name: "String"
    }
  }
};
export const productGuid: msRest.OperationQueryParameter = {
  parameterPath: "productGuid",
  mapper: {
    required: true,
    serializedName: "product_guid",
    type: {
      name: "String"
    }
  }
};
export const projectGuid: msRest.OperationQueryParameter = {
  parameterPath: "projectGuid",
  mapper: {
    required: true,
    serializedName: "project_guid",
    type: {
      name: "String"
    }
  }
};
export const proof: msRest.OperationQueryParameter = {
  parameterPath: "proof",
  mapper: {
    required: true,
    serializedName: "proof",
    type: {
      name: "String"
    }
  }
};
export const referralKey: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "referralKey"
  ],
  mapper: {
    serializedName: "referral_key",
    type: {
      name: "String"
    }
  }
};
export const repoGuid: msRest.OperationQueryParameter = {
  parameterPath: "repoGuid",
  mapper: {
    required: true,
    serializedName: "repo_guid",
    type: {
      name: "String"
    }
  }
};
export const serviceType: msRest.OperationQueryParameter = {
  parameterPath: "serviceType",
  mapper: {
    required: true,
    serializedName: "service_type",
    type: {
      name: "String"
    }
  }
};
export const status: msRest.OperationQueryParameter = {
  parameterPath: "status",
  mapper: {
    required: true,
    serializedName: "status",
    type: {
      name: "String"
    }
  }
};
export const url: msRest.OperationQueryParameter = {
  parameterPath: "url",
  mapper: {
    required: true,
    serializedName: "url",
    type: {
      name: "String"
    }
  }
};
export const usdPrice: msRest.OperationQueryParameter = {
  parameterPath: "usdPrice",
  mapper: {
    required: true,
    serializedName: "usd_price",
    type: {
      name: "Number"
    }
  }
};
export const userGuid: msRest.OperationQueryParameter = {
  parameterPath: "userGuid",
  mapper: {
    required: true,
    serializedName: "user_guid",
    type: {
      name: "String"
    }
  }
};
export const useUrl: msRest.OperationQueryParameter = {
  parameterPath: "useUrl",
  mapper: {
    required: true,
    serializedName: "use_url",
    type: {
      name: "String"
    }
  }
};
export const value: msRest.OperationQueryParameter = {
  parameterPath: "value",
  mapper: {
    required: true,
    serializedName: "value",
    type: {
      name: "String"
    }
  }
};
export const workTypeGuid: msRest.OperationQueryParameter = {
  parameterPath: "workTypeGuid",
  mapper: {
    required: true,
    serializedName: "work_type_guid",
    type: {
      name: "String"
    }
  }
};
