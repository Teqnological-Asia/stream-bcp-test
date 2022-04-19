import { matchPath } from "../../utils";

const configMenu = () => {
  return [
    {
      id: 0,
      is_highlight: false,
      defaultName: "お客さまサポートWEB",
      items: [
        {
          id: 0,
          name: "トップページ",
          href: "/account",
          subItems: [],
          groupId: 0
        }
      ]
    },
    {
      id: 1,
      name: "資産状況",
      is_highlight: false,
      items: [
        // {
        //   id: 1,
        //   name: '口座余力',
        //   href: '/account/balance',
        //   subItems: [],
        //   groupId: 1
        // },
        {
          id: 1,
          name: "取引履歴",
          href: "/account/trade/history",
          subItems: [],
          groupId: 1
        },
        {
          id: 2,
          name: "特定口座取引明細",
          href: "/account/trade/tax",
          subItems: [],
          groupId: 1
        },
        {
          id: 3,
          name: "入出金状況",
          href: "/account/payment/history",
          subItems: [],
          groupId: 1
        },
        {
          id: 4,
          name: "出金取消",
          href: "/account/payment/cancel",
          subItems: [
            "/account/payment/:id/cancel/confirm",
            "/account/payment/:id/cancel/complete"
          ],
          groupId: 1
        },
        {
          id: 13,
          name: "貸株貸出状況",
          href: "/account/trade/lendingbalance",
          subItems: [],
          groupId: 1
        },
        {
          id:14,
          name: '貸株履歴',
          href: '/account/trade/lendinghistory',
          subItems: [],
          groupId: 1
        },
        // {
        //   id:15,
        //   name: '信用保証金推移',
        //   href: '/account/trade/transition-reference',
        //   subItems: [],
        //   groupId: 1
        // }
      ]
    },
    {
      id: 2,
      name: "手続き／報告書",
      is_highlight: false,
      items: [
        {
          id: 5,
          name: "入出金",
          href: "/account/payment",
          subItems: [
            "/account/payment/withdrawal",
            "/account/payment/withdrawal/complete"
          ],
          groupId: 2
        },
        {
          id: 6,
          name: "単元未満株式売却",
          // name2: '単元未満株式売却サービス',
          href: "/account/fractional/sell",
          subItems: [
            "/account/fractional/complete",
            "/account/fractional/cancel",
            "/account/fractional/cancel/complete",
            "/account/fractional/clame"
          ],
          groupId: 2
        },
        {
          id: 7,
          name: "株式出庫",
          href: "/account/delivery",
          subItems: [
            "/account/delivery/complete",
            "/account/delivery/cancel",
            "/account/delivery/cancel/complete"
          ],
          groupId: 2
        },
        {
          id: 8,
          name: "電子交付サービス",
          href: "/account/report/output",
          subItems: [],
          groupId: 2
        },
        {
          id: 12,
          name: "口座廃止",
          href: "/account/close-account",
          subItems: [],
          groupId: 2
        }
      ]
    },
    {
      id: 3,
      name: "緊急時取引メニュー",
      is_highlight: true,
      items: [
        {
          id: 9,
          name: "国内株式売却",
          href: "/account/physical",
          subItems: [
            "/account/physical/:code/order",
            "/account/physical/:code/order/confirm",
            "/account/physical/:code/order/complete"
          ],
          groupId: 3
        },
        // {
        //   id: 10,
        //   name: "米国株式購入",
        //   href: "/account/us-stock/purchase",
        //   subItems: [
        //     "/account/us-stock/:code/purchase",
        //     "/account/us-stock/:code/purchase/confirm",
        //     "/account/us-stock/:code/purchase/complete"
        //   ],
        //   groupId: 3
        // },
        {
          id: 11,
          name: "信用建玉決済",
          href: "/account/margin",
          subItems: [
            "/account/margin/:code/select",
            "/account/margin/:code/order",
            "/account/margin/:code/order/confirm",
            "/account/margin/:code/order/complete",
            "/account/margin/:code/receipt",
            "/account/margin/:code/receipt/complete",
            "/account/margin/:code/delivery",
            "/account/margin/:code/delivery/complete"
          ],
          groupId: 3
        },
        {
          id: 12,
          name: "米国株式売却",
          href: "/account/us-stock",
          subItems: [
            "/account/us-stock/:code/sell",
            "/account/us-stock/:code/sell/confirm",
            "/account/us-stock/:code/sell/complete"
          ],
          groupId: 3
        },
        {
          id: 13,
          name: "注文照会",
          href: "/account/order",
          subItems: [
            "/account/order/:id/cancel",
            "/account/order/:id/cancel/complete",
            "/account/order/:id/detail"
          ],
          groupId: 4
        }
      ]
    }
  ];
};

export default function conditionConfigMenu() {
  let sidebarList = configMenu();
  sidebarList = checkMarginCondition(sidebarList);
  sidebarList = checkStockLendingCondition(sidebarList);
  sidebarList = checkAccountType(sidebarList);
  return sidebarList;
}

const checkAccountType = sidebarList => {
  const currentAccountType = sessionStorage.getItem("currentAccountType");
  if (currentAccountType && currentAccountType === "NORMAL") {
    // Disable Trade Tax Navi
    const tradeItem = {
      ...sidebarList[1],
      items: [
        // replace Tax item
        sidebarList[1].items[0],
        {
          ...sidebarList[1].items[1],
          isDisabled: true,
          helpUrl: "https://help.smartplus-sec.com/s/article/bcp-syukouza"
        },
        ...sidebarList[1].items.slice(2, sidebarList[1].items.length)
      ]
    };
    return [
      // replace Trade item
      sidebarList[0],
      tradeItem,
      ...sidebarList.slice(2, sidebarList.length)
    ];
  }
  return sidebarList;
};

const removeRoute = (sidebarList, mainItemPos, matchRoute) => {
  const sidebarItem = sidebarList[mainItemPos];
  const items = sidebarItem.items;
  const pos = items.findIndex(item => item.href === matchRoute);
  if (pos !== -1) {
    const newItems = [
      ...items.slice(0, pos),
      ...items.slice(pos + 1, items.length)
    ];
    return [
      ...sidebarList.slice(0, mainItemPos),
      {
        ...sidebarItem,
        items: newItems
      },
      ...sidebarList.slice(mainItemPos + 1, sidebarList.length),
    ];
  }
  return sidebarList
};

const checkMarginCondition = sidebarList => {
  const marginAccountStatus = sessionStorage.getItem("marginAccountStatus");
  if (marginAccountStatus !== "2" && marginAccountStatus !== "3") {
    const temp = removeRoute(sidebarList, sidebarList.length - 1, "/account/margin");
    return removeRoute(temp, 1, "/account/trade/transition-reference");
  }
  return sidebarList;
};

const checkStockLendingCondition = sidebarList => {
  const stockLendingStatus = sessionStorage.getItem("stockLendingStatus");
  if (stockLendingStatus !== "2" && stockLendingStatus !== "4") {
    return removeRoute(sidebarList, 1,"/account/trade/lendingbalance");
  }
  return sidebarList;
};

export function findMenuInfoByPathName(pathName) {
  let result = null;

  conditionConfigMenu().forEach(function(menu) {
    menu.items.forEach(function(item) {
      const path = pathName.replace(/\/+$/, "");
      const pathPatterns = item.subItems.concat(item.href);

      if (matchPath(pathPatterns, path)) {
        result = {
          id: item.id,
          name: item.name2 || item.name,
          group: menu
        };
      }
    });
  });

  return result;
}
