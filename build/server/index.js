import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, writeAsyncIterableToWritable, redirect } from "@remix-run/node";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useLoaderData, useSubmit, redirect as redirect$1, Form, useFetcher, useLocation } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Popover, PopoverButton, PopoverPanel, TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { ChevronDownIcon, HomeIcon, PrinterIcon, StopCircleIcon, CubeTransparentIcon, DocumentTextIcon, Cog6ToothIcon, UsersIcon, BoltIcon, WrenchScrewdriverIcon, InformationCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import sqlite from "better-sqlite3";
import { useState, useRef, useEffect } from "react";
import * as fs from "fs";
import * as path from "path";
import { unzipSync, strFromU8 } from "fflate";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const navElements = [
  { name: "Home", href: "/", icon: /* @__PURE__ */ jsx(HomeIcon, { height: 30 }) },
  { name: "Printers", href: "/Printers", icon: /* @__PURE__ */ jsx(PrinterIcon, { height: 30 }) },
  {
    name: "Filaments",
    href: "/Filaments",
    icon: /* @__PURE__ */ jsx(StopCircleIcon, { height: 30 })
  },
  {
    name: "Prints",
    href: "/Prints",
    icon: /* @__PURE__ */ jsx(CubeTransparentIcon, { height: 30 })
  },
  {
    name: "Invoices",
    href: "/invoices",
    icon: /* @__PURE__ */ jsx(DocumentTextIcon, { height: 30 })
  },
  {
    name: "Config",
    href: "",
    icon: /* @__PURE__ */ jsx(WrenchScrewdriverIcon, { height: 30 }),
    children: [
      {
        name: "Settings",
        href: "Settings",
        icon: /* @__PURE__ */ jsx(Cog6ToothIcon, { height: 22 })
      },
      {
        name: "Clients",
        href: "Clients",
        icon: /* @__PURE__ */ jsx(UsersIcon, { height: 22 })
      },
      {
        name: "Electricity",
        href: "Electricity",
        icon: /* @__PURE__ */ jsx(BoltIcon, { height: 22 })
      },
      {
        name: "3Mf Explorer",
        href: "3MfExplorer",
        icon: /* @__PURE__ */ jsx(WrenchScrewdriverIcon, { height: 22 })
      },
      {
        name: "Consumables",
        href: "Consumables",
        icon: /* @__PURE__ */ jsx(StopCircleIcon, { height: 22 })
      },
      {
        name: "About",
        href: "About",
        icon: /* @__PURE__ */ jsx(InformationCircleIcon, { height: 22 })
      }
    ]
  }
];
function Navbar() {
  return /* @__PURE__ */ jsx("div", { className: "App z-[5000]", children: /* @__PURE__ */ jsx(
    "header",
    {
      className: "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-dark-700 rounded-lg bg-dark-200\n			 z-[5000] px-8 py-4 items-center justify-center divide-double divide-x bg-gray-900",
      children: navElements.map((element, index) => /* @__PURE__ */ jsx("div", { className: "pl-4 pr-4", children: element.children ? /* @__PURE__ */ jsxs(Popover, { className: "group", children: [
        /* @__PURE__ */ jsxs(PopoverButton, { className: "flex flex-row items-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "hidden md:block", children: element.name }),
          /* @__PURE__ */ jsx("span", { className: "block md:hidden", children: element.icon }),
          /* @__PURE__ */ jsx(
            ChevronDownIcon,
            {
              className: "align-bottom size-5 group-data-[open]:-rotate-180\n									transition duration-100"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          PopoverPanel,
          {
            "aria-orientation": "vertical",
            transition: true,
            anchor: "bottom",
            className: "mt-4 divide-y divide-white/5 rounded-xl bg-black/80\n									 text-sm/6 transition duration-200 ease-in-out\n									 [data-[closed]:-translate-y-1 data-[closed]:opacity-0\n									 ",
            children: element.children.map((childElement, childIndex) => /* @__PURE__ */ jsx(
              Link,
              {
                prefetch: "intent",
                to: `${element.href + "/" + childElement.href}`,
                className: "rounded-lg py-2 px-5 transition hover:bg-white/5 w-full block font-medium",
                children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2", children: [
                  /* @__PURE__ */ jsx("span", { children: childElement.icon }),
                  /* @__PURE__ */ jsx("span", { children: childElement.name })
                ] })
              },
              `child-element-${childIndex}`
            ))
          }
        )
      ] }) : /* @__PURE__ */ jsxs(Link, { to: `${element.href}`, prefetch: "intent", children: [
        /* @__PURE__ */ jsx("span", { className: "hidden md:block", children: element.name }),
        /* @__PURE__ */ jsx("span", { className: "block md:hidden", children: element.icon })
      ] }, index) }, `nav-element-${index}`))
    }
  ) });
}
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
let db;
if (process.env.NODE_ENV === "production") {
  db = new sqlite("faktur.db");
} else {
  if (!global.__db) {
    global.__db = new sqlite("faktur.db");
  }
  db = global.__db;
}
db.exec(`
	CREATE TABLE IF NOT EXISTS printers (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		image TEXT NOT NULL,
		price REAL NOT NULL,
		canPrint TEXT NOT NULL,
		consumption REAL NOT NULL,
		archived INTEGER NOT NULL DEFAULT 0
	);

	CREATE TABLE IF NOT EXISTS upgrades (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		price REAL NOT NULL,
		installDate TEXT NOT NULL,
		printerId INTEGER NOT NULL,
		archived INTEGER NOT NULL DEFAULT 0,
		FOREIGN KEY (printerId) REFERENCES printers(id) ON DELETE CASCADE
	);

	CREATE TABLE IF NOT EXISTS consumables (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		lifeTime INTEGER NOT NULL,
		usedTime INTEGER NOT NULL,
		price REAL NOT NULL,
		printerId INTEGER NOT NULL,
		archived INTEGER NOT NULL DEFAULT 0,
		FOREIGN KEY (printerId) REFERENCES printers(id) ON DELETE CASCADE
	);

	CREATE TABLE IF NOT EXISTS filaments (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		image TEXT NOT NULL,
		material TEXT NOT NULL,
		brand TEXT NOT NULL,
		description TEXT NOT NULL,
		price REAL NOT NULL,
		quantity INTEGER NOT NULL,
		unit TEXT NOT NULL,
		color TEXT NOT NULL,
		archived INTEGER NOT NULL DEFAULT 0
	);

	CREATE TABLE IF NOT EXISTS prints (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		date TEXT NOT NULL,
		printerUsed INTEGER NOT NULL,
		filamentsUsed TEXT NOT NULL, -- JSON array of filament IDs
		clientId INTEGER NOT NULL,
		filamentsQuantity TEXT NOT NULL,
		timeToModel INTEGER NOT NULL,
		timeToPrint INTEGER NOT NULL,
		timeToPostProcess INTEGER NOT NULL,
		file TEXT NOT NULL,
		image TEXT NOT NULL,
		usedUpgrades TEXT NOT NULL, -- JSON array of upgrade IDs
		usedConsumables TEXT NOT NULL, -- JSON array of consumable IDs
		archived INTEGER NOT NULL DEFAULT 0
	);
	CREATE TABLE IF NOT EXISTS conso (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		printerId INTEGER NOT NULL,
		filamentType TEXT NOT NULL,
		consoKw INTEGER NOT NULL,
		FOREIGN KEY (printerId) REFERENCES printers(id) ON DELETE CASCADE
	);
	CREATE TABLE IF NOT EXISTS config (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		elecPrice REAL NOT NULL
	);

		CREATE TABLE IF NOT EXISTS clients (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT,
		phone TEXT,
		address TEXT,
		archived INTEGER NOT NULL DEFAULT 0
	);
`);
function addArchivedColumnIfNotExists(tableName) {
  try {
    db.exec(
      `ALTER TABLE ${tableName} ADD COLUMN archived INTEGER NOT NULL DEFAULT 0;`
    );
  } catch (error) {
    if (error instanceof Error && !error.message.includes("duplicate column name")) {
      throw error;
    }
  }
}
addArchivedColumnIfNotExists("printers");
addArchivedColumnIfNotExists("upgrades");
addArchivedColumnIfNotExists("consumables");
addArchivedColumnIfNotExists("clients");
const printerCount = db.prepare("SELECT COUNT(*) as count FROM printers").get();
if (printerCount.count === 0) {
  const data = [
    {
      image: "https://cdn-3.makershop.fr/10223-thickbox_default/bambulab-x1-carbon-combo.jpg",
      name: "Bambu-Lab X1Carbon",
      price: 1800,
      consumption: 50,
      canPrint: ["PLA", "PPS-CF", "PETG", "ASA"],
      upgrades: [
        {
          name: "Nozzle Biqu Hotend Revo RapidChange",
          price: 150,
          installDate: "01/02/2025"
        },
        {
          name: "2 x Rapid Change nozzle",
          price: 75,
          installDate: "01/02/2025"
        },
        {
          name: "AMS filament changer",
          price: 300,
          installDate: "01/02/2025"
        },
        {
          name: "rgb leds for tuning",
          price: 12.45,
          installDate: "01/02/2025"
        }
      ],
      consumables: [
        {
          name: "Courroies axe y",
          lifeTime: 250,
          usedTime: 0,
          price: 50
        },
        {
          name: "plaque chauffante",
          lifeTime: 50,
          usedTime: 0,
          price: 60
        },
        {
          name: "Buse .1mm",
          lifeTime: 24,
          usedTime: 5,
          price: 74
        }
      ]
    },
    {
      image: "https://www.polyfab3d.fr/9702-large_default/elegoo-mars-3-pro.jpg",
      name: "Mars 3 Pro",
      price: 300,
      consumption: 50,
      canPrint: ["Resin"],
      upgrades: [
        {
          name: "Jacuzzy mode with bubbles",
          price: 45,
          installDate: "20/04/2025"
        }
      ],
      consumables: [
        {
          name: "Courroies axe X",
          lifeTime: 250,
          usedTime: 0,
          price: 54
        },
        {
          name: "plaque chauffante",
          lifeTime: 50,
          usedTime: 0,
          price: 66
        }
      ]
    },
    {
      image: "https://img.staticdj.com/78b4b1a181b236e46e401c5efe4df976.jpg",
      name: "Creality ender 3",
      price: 1800,
      consumption: 50,
      canPrint: ["PLA", "PETG", "ABS"],
      upgrades: [
        {
          name: "BLTouch Auto Bed Leveling Sensor",
          price: 69,
          installDate: "01/02/2025"
        },
        {
          name: "Y-Carriage Plate Upgrade",
          price: 75,
          installDate: "01/02/2025"
        },
        {
          name: "Adjustable Screen Mount for Ender 3 V2",
          price: 96.99,
          installDate: "01/02/2025"
        },
        {
          name: "Creality 3D Printer Enclosure",
          price: 80,
          installDate: "01/02/2025"
        },
        {
          name: "SD Card Extension Cable",
          price: 0.45,
          installDate: "01/02/2025"
        }
      ],
      consumables: [
        {
          name: "Courroies axe X",
          lifeTime: 250,
          usedTime: 0,
          price: 55
        },
        {
          name: "plaque chauffante",
          lifeTime: 50,
          usedTime: 0,
          price: 68
        }
      ]
    }
  ];
  const insertPrinter = db.prepare(`
		INSERT INTO printers (name, image, price, consumption, canPrint)
		VALUES (?, ?, ?, ?, ?)
	`);
  const insertUpgrade = db.prepare(`
		INSERT INTO upgrades (name, price, installDate, printerId)
		VALUES (?, ?, ?, ?)
	`);
  const insertConsumable = db.prepare(`
		INSERT INTO consumables (name, lifeTime, usedTime, price, printerId)
		VALUES (?, ?, ?, ?, ?)
	`);
  const insertPrinterWithRelations = db.transaction((printer) => {
    const printerResult = insertPrinter.run(
      printer.name,
      printer.image,
      printer.price,
      printer.consumption,
      JSON.stringify(printer.canPrint)
    );
    const printerId = printerResult.lastInsertRowid;
    for (const upgrade of printer.upgrades) {
      insertUpgrade.run(
        upgrade.name,
        upgrade.price,
        upgrade.installDate,
        printerId
      );
    }
    for (const consumable of printer.consumables) {
      insertConsumable.run(
        consumable.name,
        consumable.lifeTime,
        consumable.usedTime,
        consumable.price,
        printerId
      );
    }
    return printerId;
  });
  for (const printer of data) {
    insertPrinterWithRelations(printer);
  }
  console.log("Database seeded with initial data");
}
const printCount = db.prepare("SELECT COUNT(*) as count FROM prints").get();
if (printCount.count === 0) {
  const prints = [
    {
      id: 1,
      name: "Benchy",
      date: /* @__PURE__ */ new Date("2025-02-01"),
      printerUsed: 1,
      filamentsUsed: [2],
      clientId: 1,
      filamentsQuantity: [40],
      image: "/prints/imgs/3DBenchy.png",
      file: "",
      timeToModel: 30,
      timeToPrint: 50,
      timeToPostProcess: 10,
      usedUpgrades: [66, 67],
      usedConsumables: [63, 64, 65]
    },
    {
      id: 2,
      name: "Pikachu",
      date: /* @__PURE__ */ new Date("2024-03-05"),
      printerUsed: 2,
      filamentsUsed: [3, 2, 1],
      clientId: 2,
      filamentsQuantity: [113, 96, 120],
      image: "/prints/imgs/plate_1.png",
      file: "",
      timeToModel: 30,
      timeToPrint: 345,
      timeToPostProcess: 10,
      usedUpgrades: [66, 67],
      usedConsumables: [63, 64, 65]
    },
    {
      id: 3,
      name: "Boeing 747",
      date: /* @__PURE__ */ new Date("2024-08-11"),
      printerUsed: 2,
      filamentsUsed: [3, 1],
      clientId: 2,
      filamentsQuantity: [245, 747],
      image: "/prints/imgs/boeing747.webp",
      file: "",
      timeToModel: 30,
      timeToPrint: 345,
      timeToPostProcess: 10,
      usedUpgrades: [66, 67],
      usedConsumables: [63, 64, 65]
    }
  ];
  const insertPrint = db.prepare(`
		INSERT INTO prints (name, date, printerUsed, filamentsUsed, clientId, filamentsQuantity, timeToPrint, file, image, usedUpgrades, usedConsumables)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`);
  const insertPrints = db.transaction((print2) => {
    insertPrint.run(
      print2.name,
      print2.date.toLocaleString("fr-FR", {
        timeZone: "Europe/Paris"
      }),
      print2.printerUsed,
      JSON.stringify(print2.filamentsUsed),
      print2.clientId,
      JSON.stringify(print2.filamentsQuantity),
      print2.timeToPrint,
      print2.file,
      print2.image,
      JSON.stringify(print2.usedUpgrades),
      JSON.stringify(print2.usedConsumables)
    );
  });
  for (const print2 of prints) {
    insertPrints(print2);
  }
  console.log("Database seeded with initial prints data");
}
const insertClients = db.prepare(`
	INSERT INTO clients (name, email, phone, address)
	VALUES (?, ?, ?, ?)
`);
const clientsCount = db.prepare("SELECT COUNT(*) as count FROM clients").get();
if (clientsCount.count === 0) {
  const clients = [
    {
      name: "Virgile",
      email: "virgile.barbera@gmail.com",
      phone: "06 95 23 94 33",
      address: "15 rue d'ermont, 95320 Saint-Leu-la-Forêt"
    },
    {
      name: "Alex",
      email: "Alex@zizi.com",
      phone: "06 69 69 69 69",
      address: "3eme porte a gauche, Eloyes"
    }
  ];
  for (const client of clients) {
    insertClients.run(client.name, client.email, client.phone, client.address);
  }
  console.log("Database seeded with initial clients data");
}
function getAllPrinters(withArchived = false) {
  const dbPrinters = db.prepare(
    `
		SELECT * FROM printers
		${withArchived == false ? "WHERE archived = 0" : ""}
		ORDER BY name
	`
  ).all();
  const printers = dbPrinters.map((printer) => ({
    ...printer,
    canPrint: typeof printer.canPrint === "string" ? JSON.parse(printer.canPrint || "[]") : printer.canPrint
  }));
  return printers.map((printer) => {
    const upgrades = db.prepare(
      `
			SELECT id, name, price, installDate FROM upgrades
			WHERE printerId = ?
		`
    ).all(printer.id);
    const consumables = db.prepare(
      `
			SELECT id, name, lifeTime, usedTime, price FROM consumables
			WHERE printerId = ?
		`
    ).all(printer.id);
    return {
      ...printer,
      upgrades,
      consumables
    };
  });
}
function getPrinterById$1(id) {
  const printer = db.prepare(
    `
		SELECT * FROM printers WHERE id = ?
	`
  ).get(id);
  if (!printer) return null;
  const upgrades = db.prepare(
    `
		SELECT id, name, price, installDate FROM upgrades
		WHERE printerId = ?
	`
  ).all(printer.id);
  const consumables = db.prepare(
    `
		SELECT id, name, lifeTime, usedTime, price FROM consumables
		WHERE printerId = ?
	`
  ).all(printer.id);
  return {
    ...printer,
    upgrades,
    consumables
  };
}
function createPrinter(printer) {
  const insertPrinter = db.prepare(`
		INSERT INTO printers (name, image, price, consumption, canPrint)
		VALUES (?, ?, ?, ?, ?)
	`);
  const insertUpgrade = db.prepare(`
		INSERT INTO upgrades (name, price, installDate, printerId)
		VALUES (?, ?, ?, ?)
	`);
  const insertConsumable = db.prepare(`
		INSERT INTO consumables (name, lifeTime, usedTime, price, printerId)
		VALUES (?, ?, ?, ?, ?)
	`);
  const result = db.transaction(() => {
    const info = insertPrinter.run(
      printer.name,
      printer.image,
      printer.price,
      printer.consumption,
      printer.canPrint
    );
    const newPrinterId = info.lastInsertRowid;
    for (const upgrade of printer.upgrades) {
      insertUpgrade.run(
        upgrade.name,
        upgrade.price,
        upgrade.installDate,
        newPrinterId
      );
    }
    for (const consumable of printer.consumables) {
      insertConsumable.run(
        consumable.name,
        consumable.lifeTime,
        consumable.usedTime,
        consumable.price,
        newPrinterId
      );
    }
    return newPrinterId;
  })();
  return getPrinterById$1(result);
}
function updatePrinter(printer) {
  const { id } = printer;
  if (!id) return null;
  const updatePrinterStmt = db.prepare(`
		UPDATE printers
		SET name = ?, image = ?, price = ?, consumption = ?, canPrint = ?
		WHERE id = ?
	`);
  const deleteUpgrades = db.prepare(`DELETE FROM upgrades WHERE printerId = ?`);
  const deleteConsumables = db.prepare(
    `DELETE FROM consumables WHERE printerId = ?`
  );
  const insertUpgrade = db.prepare(`
		INSERT INTO upgrades (name, price, installDate, printerId)
		VALUES (?, ?, ?, ?)
	`);
  const insertConsumable = db.prepare(`
		INSERT INTO consumables (name, lifeTime, usedTime, price, printerId)
		VALUES (?, ?, ?, ?, ?)
	`);
  db.transaction(() => {
    updatePrinterStmt.run(
      printer.name,
      printer.image,
      printer.price,
      printer.consumption,
      printer.canPrint,
      id
    );
    deleteUpgrades.run(id);
    deleteConsumables.run(id);
    for (const upgrade of printer.upgrades) {
      insertUpgrade.run(upgrade.name, upgrade.price, upgrade.installDate, id);
    }
    for (const consumable of printer.consumables) {
      insertConsumable.run(
        consumable.name,
        consumable.lifeTime,
        consumable.usedTime,
        consumable.price,
        id
      );
    }
  })();
  return getPrinterById$1(id);
}
function deletePrinter(id) {
  const result = db.prepare(`UPDATE printers SET archived = 1 WHERE id = ?`).run(id);
  return result.changes > 0;
}
function getAllConso() {
  const consos = db.prepare(`SELECT * FROM conso ORDER BY id;`).all();
  return consos;
}
function getElecPrice() {
  return db.prepare(`SELECT elecPrice FROM config LIMIT 1`).get().elecPrice;
}
function createConso(conso) {
  db.prepare(
    `insert into conso (printerId, consoKw, filamentType)
		values (?, ?, ?);`
  ).run(conso.printerId, conso.consoKw, conso.filamentType);
}
function updateConsos(consos) {
  db.prepare("delete from conso").run();
  let nb = 0;
  consos.map((conso) => {
    console.log(conso);
    createConso(conso);
    nb++;
  });
  return nb;
}
function updateElecPrice(price) {
  const result = db.prepare(`UPDATE config SET elecPrice  = ?;`).run(price);
  return result.changes > 0;
}
const loader$9 = async () => {
  const consos = getAllConso();
  const elecPrice = getElecPrice();
  return Response.json({ consos, elecPrice });
};
async function action$6({ request }) {
  switch (request.method) {
    case "POST": {
      const coucou = await request.json();
      const nb = updateConsos(coucou);
      return Response.json({ updated: nb });
    }
    case "PUT": {
      const reqData = await request.json();
      console.log(reqData);
    }
    case "PATCH": {
      const reqData = await request.json();
      return Response.json({ updated: updateElecPrice(reqData.newPrice) });
    }
  }
  return null;
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
function getAllPrints() {
  const rawPrints = db.prepare(
    `
				SELECT * FROM prints
				WHERE archived = 0
				ORDER BY date DESC
				`
  ).all();
  const prints = rawPrints.map((print2) => ({
    ...print2,
    filamentsUsed: JSON.parse(print2.filamentsUsed),
    filamentsQuantity: JSON.parse(print2.filamentsQuantity),
    usedUpgrades: JSON.parse(print2.usedUpgrades),
    usedConsumables: JSON.parse(print2.usedConsumables)
  }));
  return prints;
}
function getPrintById(id) {
  const rawPrint = db.prepare(
    `
				SELECT * FROM prints WHERE id = ?
				`
  ).get(id);
  if (!rawPrint) return null;
  const print2 = {
    ...rawPrint,
    filamentsUsed: JSON.parse(rawPrint.filamentsUsed),
    filamentsQuantity: JSON.parse(rawPrint.filamentsQuantity),
    usedUpgrades: JSON.parse(rawPrint.usedUpgrades),
    usedConsumables: JSON.parse(rawPrint.usedConsumables)
  };
  return print2;
}
function createPrint(print2) {
  const insertPrintReq = db.prepare(`
			INSERT INTO prints (name, date, printerUsed, filamentsUsed, clientId, filamentsQuantity, timeToModel, timeToPrint, timeToPostProcess, file, image, usedUpgrades, usedConsumables)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`);
  const result = insertPrintReq.run(
    print2.name,
    print2.date,
    print2.printerUsed,
    JSON.stringify(print2.filamentsUsed),
    print2.clientId,
    JSON.stringify(print2.filamentsQuantity),
    print2.timeToModel,
    print2.timeToPrint,
    print2.timeToPostProcess,
    print2.file,
    print2.image,
    JSON.stringify(print2.usedUpgrades),
    JSON.stringify(print2.usedConsumables)
  );
  const newPrintId = result.lastInsertRowid;
  return getPrintById(newPrintId);
}
function updatePrint(print2) {
  const { id } = print2;
  if (!id) return null;
  const updatePrintReq = db.prepare(`
		UPDATE prints
		SET name = ?, date = ?, printerUsed = ?, filamentsUsed = ?, clientId = ?, filamentsQuantity = ?, timeToModel = ?, timeToPrint = ?, timeToPostProcess = ?, file = ?, image = ?, usedUpgrades = ?, usedConsumables = ?
		WHERE id = ?
		`);
  updatePrintReq.run(
    print2.name,
    print2.date,
    print2.printerUsed,
    JSON.stringify(print2.filamentsUsed),
    print2.clientId,
    JSON.stringify(print2.filamentsQuantity),
    print2.timeToModel,
    print2.timeToPrint,
    print2.timeToPostProcess,
    print2.file,
    print2.image,
    JSON.stringify(print2.usedUpgrades),
    JSON.stringify(print2.usedConsumables),
    id
  );
  return getPrintById(id);
}
function deletePrint(id) {
  const result = db.prepare(`UPDATE prints SET archived = 1 WHERE id = ?`).run(id);
  return result.changes > 0;
}
function getAllFilaments() {
  const filaments = db.prepare(
    `
			SELECT * FROM filaments
			WHERE archived = 0
			ORDER BY name
			`
  ).all();
  return filaments;
}
function getFilamentById(id) {
  const filament = db.prepare(
    `
			SELECT * FROM filaments WHERE id = ?
			`
  ).get(id);
  return filament || null;
}
function createFilament(filament) {
  const insertFilamentReq = db.prepare(`
			INSERT INTO filaments (name, image, material, brand, description, price, quantity, unit, color)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
		`);
  const result = insertFilamentReq.run(
    filament.name,
    filament.image,
    filament.material,
    filament.brand,
    filament.description,
    filament.price,
    filament.quantity,
    filament.unit,
    filament.color
  );
  const newFilamentId = result.lastInsertRowid;
  return getFilamentById(newFilamentId);
}
function updateFilament(filament) {
  const { id } = filament;
  if (!id) return null;
  const updateFilamentReq = db.prepare(`
		UPDATE filaments
		SET name = ?, image = ?, material = ?, brand = ?, description = ?, price = ?, quantity = ?, unit = ?, color = ?
		WHERE id = ?
		`);
  updateFilamentReq.run(
    filament.name,
    filament.image,
    filament.material,
    filament.brand,
    filament.description,
    filament.price,
    filament.quantity,
    filament.unit,
    filament.color,
    id
  );
  return getFilamentById(id);
}
function deleteFilament(id) {
  const result = db.prepare(`UPDATE filaments SET archived = 1 WHERE id = ?`).run(id);
  return result.changes > 0;
}
function getFilamentMaterials() {
  const materials = db.prepare(
    `
			SELECT distinct material FROM filaments
			`
  ).all();
  return materials.map((material) => material.material);
}
function FilterSelect({ items, selectedItem, setSelectedItem, label, showAll = true }) {
  return /* @__PURE__ */ jsxs(Popover, { className: "group min-w-64 max-w-64", children: [
    /* @__PURE__ */ jsxs(
      PopoverButton,
      {
        className: "flex flex-row w-full border\n									group-data-[open]:border-b-transparent group-data-[open]:rounded-b-none\n									border-gray-700 rounded-lg items-center justify-between gap-1",
        children: [
          selectedItem == null ? /* @__PURE__ */ jsx("div", { className: "p-2", children: label }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-10 rounded-lg",
                src: selectedItem.image,
                alt: selectedItem.name
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mt-2", children: selectedItem.name })
          ] }),
          /* @__PURE__ */ jsx(
            ChevronDownIcon,
            {
              className: "align-bottom size-5 group-data-[open]:-rotate-180\n											transition duration-100"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      PopoverPanel,
      {
        "aria-orientation": "vertical",
        transition: true,
        anchor: "bottom",
        className: "divide-y divide-white/5 rounded-b-lg bg-black/95\n										text-sm/6 transition duration-200 ease-in-out\n										[data-[closed]:-translate-y-1 data-[closed]:opacity-0\n										border border-gray-700 w-64",
        children: ({ close }) => /* @__PURE__ */ jsxs(Fragment, { children: [
          selectedItem && showAll && /* @__PURE__ */ jsx(
            "div",
            {
              className: "rounded-lg py-2 px-5 transition hover:bg-white/5 w-full block font-medium",
              onClick: () => {
                setSelectedItem(null);
                close();
              },
              children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    className: "h-10 bg-white rounded-lg",
                    src: "/removeFilter.svg",
                    alt: "Remove filter"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
                  "All ",
                  label.toLowerCase(),
                  "s"
                ] })
              ] })
            },
            "remove-filter"
          ),
          items.map((item, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "rounded-lg py-2 px-5 transition hover:bg-white/5 w-full block font-medium",
              onClick: () => {
                setSelectedItem(item);
                close();
              },
              children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    className: "h-10 rounded-lg",
                    src: item.image,
                    alt: item.name
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "mt-2", children: item.name })
              ] })
            },
            index
          ))
        ] })
      }
    )
  ] });
}
function NewPrintForm({
  printers,
  filaments,
  onSubmit,
  initialPrint,
  submitLabel = initialPrint ? "Save Changes" : "Create Print",
  title = initialPrint ? "Edit Print" : "Create a New Print"
}) {
  const [newPrint, setNewPrint] = useState(
    initialPrint || {
      name: "",
      date: /* @__PURE__ */ new Date(),
      clientId: 0,
      printerUsed: 0,
      filamentsUsed: [],
      timeToModel: 0,
      timeToPrint: 0,
      timeToPostProcess: 0,
      image: "",
      filamentsQuantity: [],
      file: "",
      usedUpgrades: [],
      usedConsumables: []
    }
  );
  const [selectedFilaments, setSelectedFilaments] = useState(
    initialPrint ? [...initialPrint.filamentsUsed] : []
  );
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    (initialPrint == null ? void 0 : initialPrint.image) ? initialPrint.image : null
  );
  const printFileInputRef = useRef(null);
  const [printFile, setPrintFile] = useState(null);
  const [filamentsPrices, setFilamentsPrices] = useState(0);
  const [electricityPrices, setElectricityPrices] = useState(0);
  const [laborPrices, setLaborPrices] = useState(30);
  const [elecPrices, setElecPrices] = useState([]);
  const [priceKw, setPriceKw] = useState(0);
  const [laborCosts, setLaborCosts] = useState(0);
  useEffect(() => {
    const fetchElectricityPrices = async () => {
      try {
        const elecPrices2 = await fetch("/api/electricity");
        var consos = [];
        var elecPrice = 0;
        ({ consos, elecPrice } = await elecPrices2.json());
        console.log("ElecPrice: ", elecPrice);
        console.log("Consos: ", consos);
        if (consos) setElecPrices(consos);
        setPriceKw(elecPrice);
      } catch (error) {
        console.error("Failed to fetch electricity prices:", error);
      }
    };
    fetchElectricityPrices();
  }, []);
  useEffect(() => {
    const usedFilaments = filaments.filter((f) => selectedFilaments.includes(f.id));
    const totalFilaments = usedFilaments.map((f) => {
      const idx = newPrint.filamentsUsed.indexOf(f.id);
      const qty = idx !== -1 ? newPrint.filamentsQuantity[idx] || 0 : 0;
      return qty * (f.price || 0) / 1e3;
    });
    setFilamentsPrices(totalFilaments.reduce((a, b) => a + b, 0));
    const qtyFor = (f) => {
      const idx = newPrint.filamentsUsed.indexOf(f.id);
      return idx !== -1 ? newPrint.filamentsQuantity[idx] || 0 : 0;
    };
    const totalQty = usedFilaments.reduce((sum, f) => sum + qtyFor(f), 0);
    const hours = (newPrint.timeToPrint || 0) / 60;
    let totalCost = 0;
    usedFilaments.forEach((f) => {
      const consumption = elecPrices.find(
        (e) => e.filamentType === f.material && e.printerId === newPrint.printerUsed
      );
      if (!consumption) return;
      const ratio = totalQty > 0 ? qtyFor(f) / totalQty : usedFilaments.length > 0 ? 1 / usedFilaments.length : 0;
      totalCost += hours * consumption.consoKw * priceKw * ratio / 1e3;
    });
    setElectricityPrices(Number.isFinite(totalCost) ? totalCost : 0);
    console.log("Labor Costs: ", laborPrices);
    const totalLabor = (newPrint.timeToModel + newPrint.timeToPostProcess) * laborPrices / 60;
    setLaborCosts(Number.isFinite(totalLabor) ? totalLabor : 0);
  }, [newPrint, elecPrices, priceKw, filaments, selectedFilaments, laborPrices]);
  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e2) => {
        var _a;
        if ((_a = e2.target) == null ? void 0 : _a.result) {
          setImagePreview(e2.target.result);
        }
      };
      reader.readAsDataURL(file);
      const fileName = `${Date.now()}_${file.name}`;
      setNewPrint({
        ...newPrint,
        image: `/prints/imgs/${fileName}`
        // This will be the path after saving
      });
    }
  };
  const handlePrintFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPrintFile(file);
      const fileName = `${Date.now()}_${file.name}`;
      setNewPrint({
        ...newPrint,
        file: `/prints/files/${fileName}`
        // This will be the path after saving
      });
    }
  };
  const handleSubmit = () => {
    onSubmit(newPrint, imageFile, printFile);
  };
  const handleFilamentSelect = (filamentId) => {
    if (selectedFilaments.includes(filamentId)) {
      const idx = newPrint.filamentsUsed.indexOf(filamentId);
      const newUsed = newPrint.filamentsUsed.filter((id) => id !== filamentId);
      const newQty = newPrint.filamentsQuantity.filter((_, i) => i !== idx);
      setSelectedFilaments(selectedFilaments.filter((id) => id !== filamentId));
      setNewPrint({
        ...newPrint,
        filamentsUsed: newUsed,
        filamentsQuantity: newQty
      });
    } else {
      setSelectedFilaments([...selectedFilaments, filamentId]);
      setNewPrint({
        ...newPrint,
        filamentsUsed: [...newPrint.filamentsUsed, filamentId],
        filamentsQuantity: [...newPrint.filamentsQuantity, 0]
      });
    }
  };
  const handleQuantityChange = (filamentId, quantity) => {
    const index = newPrint.filamentsUsed.indexOf(filamentId);
    if (index !== -1) {
      const updatedQuantities = [...newPrint.filamentsQuantity];
      updatedQuantities[index] = quantity;
      setNewPrint({
        ...newPrint,
        filamentsQuantity: updatedQuantities
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsx("h1", { className: " p-2 rounded-lg text-3xl mb-4", children: title }),
    /* @__PURE__ */ jsxs("div", { className: "border border-gray-700 p-6 rounded-lg grid md:grid-cols-[16rem_70%] gap-4", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
        "Printer Used",
        /* @__PURE__ */ jsx(
          FilterSelect,
          {
            items: printers,
            selectedItem: printers.find((printer) => printer.id === newPrint.printerUsed) || null,
            setSelectedItem: (printer) => setNewPrint({ ...newPrint, printerUsed: printer.id }),
            showAll: false,
            label: "Printer"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "", children: [
        /* @__PURE__ */ jsx("label", { className: "block mb-2", children: "Filaments Used" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 max-h-32 overflow-y-auto rounded-lg", children: filaments.map((filament) => /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => handleFilamentSelect(filament.id),
            className: `rounded-lg cursor-pointer flex items-center gap-4 h-12 w-fit pr-3 border border-gray-700 ${selectedFilaments.includes(filament.id) ? "bg-blue-600" : "bg-gray-800"}`,
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: `${filament.image}`,
                  alt: filament.name,
                  className: "h-12 w-12 rounded-l-lg"
                }
              ),
              filament.name,
              /* @__PURE__ */ jsx("div", { className: "ml-auto text-gray-400 text-sm", children: filament.material }),
              selectedFilaments.includes(filament.id) && (() => {
                const idx = newPrint.filamentsUsed.indexOf(filament.id);
                const qty = idx !== -1 && newPrint.filamentsQuantity[idx] !== void 0 ? newPrint.filamentsQuantity[idx] : 0;
                return /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      onClick: (e) => e.stopPropagation(),
                      value: qty,
                      onChange: (e) => handleQuantityChange(
                        filament.id,
                        Number(e.target.value)
                      ),
                      min: 0,
                      type: "number",
                      className: "text-gray-400 p-2 rounded-lg w-20"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "relative -inset-x-12", children: filament.unit })
                ] });
              })()
            ]
          },
          filament.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border border-gray-700 p-6 rounded-lg grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
        "Print Name",
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-gray-900 rounded-lg pl-2 p-1",
            type: "text",
            value: newPrint.name,
            onChange: (e) => setNewPrint({ ...newPrint, name: e.target.value }),
            placeholder: "Enter print name"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
        "Client",
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-gray-900 rounded-lg pl-2 p-1",
            type: "text",
            value: newPrint.clientId || "",
            onChange: (e) => setNewPrint({ ...newPrint, clientId: Number(e.target.value) }),
            placeholder: "Select client"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
        "Print Date",
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-gray-900 rounded-lg pl-2 p-1",
            type: "date",
            value: new Date(newPrint.date).toISOString().split("T")[0],
            onChange: (e) => setNewPrint({
              ...newPrint,
              date: new Date(e.target.value)
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
        "Modelisation Time",
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "bg-gray-900 rounded-lg pl-2 p-1 w-full text-right",
              type: "number",
              value: newPrint.timeToModel || "",
              onChange: (e) => setNewPrint({
                ...newPrint,
                timeToModel: Number(e.target.value)
              }),
              placeholder: "0"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2", children: "minutes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
        "Print Time",
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "bg-gray-900 rounded-lg pl-2 p-1 w-full text-right",
              type: "number",
              value: newPrint.timeToPrint || "",
              onChange: (e) => setNewPrint({
                ...newPrint,
                timeToPrint: Number(e.target.value)
              }),
              placeholder: "0"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2", children: "minutes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
        "Postprocess Time",
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "bg-gray-900 rounded-lg pl-2 p-1 w-full text-right",
              type: "number",
              value: newPrint.timeToPostProcess || "",
              onChange: (e) => setNewPrint({
                ...newPrint,
                timeToPostProcess: Number(e.target.value)
              }),
              placeholder: "0"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2", children: "minutes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2 bg-gray-800 rounded-lg p-2 cursor-pointer", children: [
          "Image",
          /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 rounded-lg pl-2 p-1 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: imageFile ? imageFile.name : "Choose a file..." }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "bg-gray-700 px-3 py-1 rounded",
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                children: "Browse"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: fileInputRef,
              className: "hidden",
              type: "file",
              accept: "image/*",
              onChange: handleImageSelect
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2 bg-gray-800 rounded-lg p-2 cursor-pointer", children: [
          "Print File",
          /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 rounded-lg pl-2 p-1 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: printFile ? printFile.name : "Choose a file..." }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "bg-gray-700 px-3 py-1 rounded",
                onClick: () => {
                  var _a;
                  return (_a = printFileInputRef.current) == null ? void 0 : _a.click();
                },
                children: "Browse"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: printFileInputRef,
              className: "hidden",
              type: "file",
              accept: ".stl,.obj,.3mf,.gcode",
              onChange: handlePrintFileSelect
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "block mb-2 w-full", children: [
        "Price estimate",
        /* @__PURE__ */ jsxs("div", { children: [
          "Filament : ",
          filamentsPrices,
          "€"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          "electricity : ",
          electricityPrices.toFixed(2),
          "€ (at ",
          priceKw,
          "€/kWh)"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          "labor : ",
          laborCosts.toFixed(2),
          "€"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          "total : ",
          (filamentsPrices + electricityPrices + laborCosts).toFixed(2),
          "€"
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "p-2 flex flex-col border border-gray-700 rounded-lg m-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            "Hourly rate:",
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "bg-gray-900 rounded-lg mx-2 px-2 p-1 text-right",
                type: "number",
                value: laborPrices,
                onChange: (e) => setLaborPrices(Number(e.target.value))
              }
            ),
            "€/h"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "w-full rounded-lg p-2 text-right accent-green-500",
              type: "range",
              min: "0",
              max: "100",
              value: laborPrices,
              onChange: (e) => setLaborPrices(Number(e.target.value))
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-4 mt-4", children: [
      /* @__PURE__ */ jsx(Link, { to: "/prints", children: /* @__PURE__ */ jsx("button", { className: "bg-gray-800 text-white px-4 py-2 rounded-lg", children: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-gradient-to-t from-gray-900 to-gray-800 border border-gray-700 px-4 py-2 rounded-lg",
          onClick: handleSubmit,
          children: submitLabel
        }
      )
    ] })
  ] });
}
async function loader$8({ params }) {
  const id = Number(params.id);
  const thePrint = getPrintById(id);
  if (!thePrint) throw new Response("Not found", { status: 404 });
  const printers = getAllPrinters();
  const filaments = getAllFilaments();
  return { thePrint, printers, filaments };
}
function readableStreamToAsyncIterable$1(stream) {
  const reader = stream.getReader();
  return {
    async *[Symbol.asyncIterator]() {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield value;
      }
    }
  };
}
async function action$5({ request, params }) {
  const id = Number(params.id);
  const formData = await request.formData();
  const printData = JSON.parse(formData.get("printData"));
  printData.id = id;
  const imageFile = formData.get("image");
  if (imageFile && imageFile.size > 0) {
    const uploadsDir = path.join(process.cwd(), "public", "prints", "imgs");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const fileName = `${Date.now()}_${imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = path.join(uploadsDir, fileName);
    const fileStream = fs.createWriteStream(filePath);
    await writeAsyncIterableToWritable(readableStreamToAsyncIterable$1(imageFile.stream()), fileStream);
    printData.image = `/prints/imgs/${fileName}`;
  }
  const printFile = formData.get("printFile");
  if (printFile && printFile.size > 0) {
    const uploadsDir = path.join(process.cwd(), "public", "prints", "files");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const fileName = `${Date.now()}_${printFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = path.join(uploadsDir, fileName);
    const fileStream = fs.createWriteStream(filePath);
    await writeAsyncIterableToWritable(readableStreamToAsyncIterable$1(printFile.stream()), fileStream);
    printData.file = `/prints/files/${fileName}`;
  }
  updatePrint(printData);
  return redirect("/prints");
}
function EditPrintPage() {
  const { thePrint, printers, filaments } = useLoaderData();
  const submit = useSubmit();
  console.log(thePrint);
  const handleSubmit = (printData, imageFile, printFile) => {
    const formData = new FormData();
    formData.append("printData", JSON.stringify(printData));
    if (imageFile) formData.append("image", imageFile);
    if (printFile) formData.append("printFile", printFile);
    submit(formData, { method: "post", encType: "multipart/form-data" });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "mt-[130px] h-[calc(100vh-130px)]", children: /* @__PURE__ */ jsx(
      NewPrintForm,
      {
        printers,
        filaments,
        onSubmit: handleSubmit,
        initialPrint: thePrint,
        submitLabel: "Save Changes",
        title: "Edit Print"
      }
    ) })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$5,
  default: EditPrintPage,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
function Explorer() {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const handleFileUpload = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file || !file.name.endsWith(".3mf")) return alert("Please upload a valid 3MF file.");
    const reader = new FileReader();
    reader.onload = () => {
      var _a2;
      const zip = unzipSync(new Uint8Array(reader.result));
      const config = Object.keys(zip).find((f) => f.endsWith("model_settings.config"));
      if (!config) return console.warn("No config found.");
      const xml = new DOMParser().parseFromString(strFromU8(zip[config]), "application/xml");
      const thumbPath = (_a2 = Array.from(xml.querySelectorAll("plate metadata")).find((el) => el.getAttribute("key") === "thumbnail_file")) == null ? void 0 : _a2.getAttribute("value");
      if (thumbPath && zip[thumbPath]) {
        const url = URL.createObjectURL(new Blob([zip[thumbPath]], { type: "image/png" }));
        setThumbnailUrl(url);
      } else {
        console.warn("Thumbnail not found.");
      }
    };
    reader.onerror = () => alert("Error reading file.");
    reader.readAsArrayBuffer(file);
  };
  return /* @__PURE__ */ jsx("div", { className: "mt-[130px] p-4 max-w-7xl mx-auto flex flex-col gap-8 items-center justify-center border border-gray-700 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-screen", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "p-2 m-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors",
        type: "file",
        accept: ".3mf",
        onChange: handleFileUpload
      }
    ),
    thumbnailUrl && /* @__PURE__ */ jsx("img", { src: thumbnailUrl, alt: "3MF Thumbnail", className: "mt-4 w-64 border rounded" })
  ] }) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Explorer
}, Symbol.toStringTag, { value: "Module" }));
function GenericTable({
  data,
  headers,
  removeElement,
  showRemoveButton = true
}) {
  return /* @__PURE__ */ jsxs("table", { className: "min-w-full rounded-lg border-separate border border-gray-700 table-auto ", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-900", children: [
      headers.map((header, idx) => /* @__PURE__ */ jsx(
        "th",
        {
          className: `${idx == 0 ? "rounded-tl-lg" : ""}
							px-4 py-2 text-left`,
          children: header.label
        },
        idx
      )),
      showRemoveButton && removeElement && /* @__PURE__ */ jsx("th", { className: "border-none rounded-tr-lg px-4 text-center w-24", children: "Remove" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: data.map((item, index) => /* @__PURE__ */ jsxs(
      "tr",
      {
        className: `border-none hover:bg-gray-800 ${index % 2 ? "bg-gray-900/50" : ""}`,
        children: [
          headers.map((header, idx) => /* @__PURE__ */ jsx(
            "td",
            {
              className: "border-none py-1 px-2 max-w-lg overflow-x-clip text-ellipsis",
              children: String(item[header.key])
            },
            idx
          )),
          showRemoveButton && removeElement && /* @__PURE__ */ jsx("td", { className: "border-none py-1 px-2 text-center", children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "bg-red-900 text-white px-2 py-0.5 rounded",
              onClick: () => removeElement(item),
              children: "X"
            }
          ) })
        ]
      },
      index
    )) })
  ] });
}
function ElectricityConfig({
  filaments,
  printers,
  elecPrice,
  consoData
}) {
  const [tableData, setTableData] = useState(null);
  const [Data, setData] = useState(consoData);
  const [selectedPrinter, setSelectedPrinter] = useState(printers[0]);
  const [selectedFilament, setSelectedFilament] = useState(filaments[0]);
  const [conso, setConso] = useState(elecPrice);
  async function updateElectricityPrice() {
    const body = JSON.stringify({ newPrice: conso });
    const ret = await fetch("/api/electricity", {
      method: "PATCH",
      body
    });
    const retData = await ret.json();
    console.log(retData);
  }
  async function updateData() {
    const body = JSON.stringify(Data);
    const ret = await fetch("/api/electricity", {
      method: "POST",
      body
    });
    console.log(await ret.json());
  }
  useEffect(() => {
    let data = [];
    for (let i = 0; i < Data.length; i++) {
      const dataPrinter = printers.find((p) => p.id == Data[i].printerId);
      data.push({
        conso: Data[i].consoKw,
        consoId: Data[i].id,
        filamentType: Data[i].filamentType,
        printerId: dataPrinter.id,
        printerName: dataPrinter.name,
        consoStr: Data[i].consoKw + " kw/h"
      });
    }
    setTableData(data);
  }, [Data]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: " mt-[130px] p-4 w-full max-w-7xl mx-auto\n			 flex flex-col  gap-8 items-center justify-center border border-gray-700 rounded-lg",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "border border-gray-700 p-2 rounded-lg w-full flex flex-row gap-5 ", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-0 items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm italic", children: "Prix au kWh" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "p-2 bg-gray-900 rounded-lg w-32",
                type: "number",
                step: 5e-4,
                min: 0,
                placeholder: "0.1234",
                value: conso,
                onChange: (e) => setConso(Number(e.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "px-2 bg-gray-900 rounded-lg w-20 h-[42px] place-self-end border border-gray-700 hover:border-white",
              onClick: updateElectricityPrice,
              children: "Save"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-grow w-full", children: tableData && /* @__PURE__ */ jsx(
          GenericTable,
          {
            data: tableData,
            headers: [
              { key: "printerName", label: "Printer" },
              { key: "filamentType", label: "Material" },
              { key: "consoStr", label: "Conso" }
            ],
            removeElement: (element) => setData(
              Data.filter((data) => {
                if (data.id) return data.id != element.consoId;
                return !(data.consoKw == element.conso && data.printerId == element.printerId && data.filamentType == element.filamentType);
              })
            ),
            showRemoveButton: true
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-5 w-full justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-5", children: [
            printers && /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-0 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm italic", children: "Printer:" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  className: "p-2 bg-gray-900 rounded-lg",
                  value: selectedPrinter.id,
                  onChange: (e) => {
                    setSelectedPrinter(
                      printers.filter((p) => p.id == Number(e.target.value))[0]
                    );
                  },
                  children: printers.map((printer, idx) => /* @__PURE__ */ jsx("option", { value: printer.id, children: printer.name }, idx))
                }
              )
            ] }),
            filaments && /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-0 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm italic", children: "Filament:" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  className: "p-2 bg-gray-900 rounded-lg",
                  value: selectedFilament,
                  onChange: (e) => {
                    setSelectedFilament(e.target.value);
                  },
                  children: filaments.map((filament, idx) => /* @__PURE__ */ jsx("option", { value: filament, children: filament }, idx))
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-0 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm italic", children: "Conso (kWh)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "p-2 bg-gray-900 rounded-lg w-32",
                  type: "number",
                  step: 50,
                  min: 0,
                  placeholder: "8==D",
                  onChange: (e) => setConso(Number(e.target.value))
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "py-2 px-2 bg-gray-900 rounded-lg w-20  border border-gray-700 self-end\n							hover:border-white",
                onClick: () => {
                  if (!conso || !selectedPrinter || !selectedFilament) {
                    alert("Please fill in all fields before adding.");
                    return;
                  }
                  const isDuplicate = tableData == null ? void 0 : tableData.some(
                    (tData) => tData.filamentType === selectedFilament && tData.printerId === selectedPrinter.id
                  );
                  if (isDuplicate) {
                    alert("A line with the same data already exists!");
                    return;
                  }
                  const newData = [
                    ...Data,
                    {
                      consoKw: conso,
                      filamentType: selectedFilament,
                      printerId: selectedPrinter.id
                    }
                  ];
                  setData(newData);
                },
                children: "add"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "px-2 bg-gray-900 rounded-lg w-20 h-[42px] place-self-end border border-gray-700 hover:border-white",
              onClick: () => {
                const areThereDuplicates = () => {
                  for (const td of tableData || []) {
                    const key = td.conso + td.filamentType + td.printerId;
                    if (tableData.filter(
                      (tData) => tData.filamentType + "||" + tData.printerId === key
                    ).length > 1) {
                      return key;
                    }
                  }
                  return false;
                };
                const dups = areThereDuplicates();
                if (dups) {
                  alert("duplicates found");
                  return;
                }
                updateData();
              },
              children: "Save"
            }
          )
        ] })
      ]
    }
  ) });
}
const meta$7 = () => {
  return [
    { title: "Electricity costs" },
    { name: "Electricity", content: "List of consumptions" }
  ];
};
async function loader$7({}) {
  const materials = getFilamentMaterials();
  const getDisplayElecData = getAllConso();
  const printers = getAllPrinters();
  const electPrice = getElecPrice();
  return { materials, printers, electPrice, getDisplayElecData };
}
function Electricity() {
  const { materials, printers, electPrice, getDisplayElecData } = useLoaderData();
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    ElectricityConfig,
    {
      filaments: materials,
      printers,
      elecPrice: electPrice,
      consoData: getDisplayElecData
    }
  ) });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Electricity,
  loader: loader$7,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
const meta$6 = () => {
  return [
    { title: "New Print" },
    { name: "New Print", content: "Create a new print" }
  ];
};
async function loader$6() {
  const printers = getAllPrinters();
  const filaments = getAllFilaments();
  return { printers, filaments };
}
function readableStreamToAsyncIterable(stream) {
  const reader = stream.getReader();
  return {
    async *[Symbol.asyncIterator]() {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield value;
      }
    }
  };
}
async function action$4({ request }) {
  const formData = await request.formData();
  const printData = JSON.parse(formData.get("printData"));
  const imageFile = formData.get("image");
  if (imageFile && imageFile.size > 0) {
    const uploadsDir = path.join(process.cwd(), "public", "prints", "imgs");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const fileName = `${Date.now()}_${imageFile.name.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    )}`;
    const filePath = path.join(uploadsDir, fileName);
    const fileStream = fs.createWriteStream(filePath);
    await writeAsyncIterableToWritable(
      readableStreamToAsyncIterable(imageFile.stream()),
      fileStream
    );
    printData.image = `/prints/imgs/${fileName}`;
  }
  const printFile = formData.get("printFile");
  if (printFile && printFile.size > 0) {
    const uploadsDir = path.join(process.cwd(), "public", "prints", "files");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const fileName = `${Date.now()}_${printFile.name.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    )}`;
    const filePath = path.join(uploadsDir, fileName);
    const fileStream = fs.createWriteStream(filePath);
    await writeAsyncIterableToWritable(
      readableStreamToAsyncIterable(printFile.stream()),
      fileStream
    );
    printData.file = `/prints/files/${fileName}`;
  }
  createPrint(printData);
  return redirect$1("/prints");
}
function NewPrintPage() {
  const { printers, filaments } = useLoaderData();
  const submit = useSubmit();
  const handleSubmit = (printData, imageFile, printFile) => {
    const formData = new FormData();
    formData.append("printData", JSON.stringify(printData));
    if (imageFile) {
      formData.append("image", imageFile);
    }
    if (printFile) {
      formData.append("printFile", printFile);
    }
    submit(formData, { method: "post", encType: "multipart/form-data" });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "mt-[130px] h-[calc(100vh-130px)]", children: /* @__PURE__ */ jsx(
      NewPrintForm,
      {
        printers,
        filaments,
        onSubmit: handleSubmit
      }
    ) })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: NewPrintPage,
  loader: loader$6,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
function FilamentsList({
  data,
  selectedFilament,
  setSelectedFilament
}) {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-row gap-0 overflow-x-auto relative w-full max-w-7xl mx-auto", children: data.map((filament, index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex flex-row m-2 min-w-72 border border-gray-700 
										rounded-xl relative cursor-pointer
										${selectedFilament === filament ? "bg-gray-900" : ""}`,
      onClick: () => setSelectedFilament(filament),
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: filament.image,
            className: "h-24 w-24 rounded-s-xl",
            alt: filament.name
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-2 text-sm justify-between relative w-full overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 text-xs font-bold px-2 py-1 border-l border-b border-gray-700 rounded-bl", children: filament.price + " €" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("div", { children: filament.brand }),
            /* @__PURE__ */ jsx("div", { children: filament.material }),
            /* @__PURE__ */ jsx("div", { children: filament.name })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xs", children: "coucou Options" })
        ] })
      ]
    },
    index
  )) });
}
function FilamentDetails({
  selectedFilament,
  setNewFilament
}) {
  if (!selectedFilament) return /* @__PURE__ */ jsx("div", { children: "coucou" });
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 justify-between m-4 rounded-xl border border-gray-700 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full p-2 col-span-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between mr-2", children: [
        /* @__PURE__ */ jsx("div", { children: selectedFilament.name }),
        /* @__PURE__ */ jsx("div", { children: selectedFilament.price + " €" })
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "p-2 text-xs", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-base text-justify", children: "Description:" }),
        selectedFilament.description
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: selectedFilament.image,
          alt: selectedFilament.name,
          className: "h-full w-full rounded-r-xl object-cover col-span-1"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "col-span-2 relative -inset-y-12 -inset-x-4 flex justify-end gap-4 ", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "bg-gray-800 py-2 px-4 rounded-lg flex flex-row gap-2",
            onClick: () => setNewFilament(selectedFilament),
            children: [
              /* @__PURE__ */ jsx(PencilSquareIcon, { height: 24 }),
              "Edit"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("form", { method: "post", children: [
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "_action", value: "delete" }),
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "filamentId", value: selectedFilament.id }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              className: "bg-red-800 py-2 px-4 rounded-lg flex flex-row gap-2",
              children: [
                /* @__PURE__ */ jsx(TrashIcon, { height: 24 }),
                "Delete"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function BaseInfos({
  newFilament,
  setNewFilament
}) {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-10 gap-4", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 col-span-7", children: [
        "Name",
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-gray-900 rounded-lg pl-2 p-1",
            value: newFilament.name || "",
            onChange: (e) => setNewFilament({ ...newFilament, name: e.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 col-span-3", children: [
        "Price",
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "bg-gray-900 rounded-lg pl-2 p-1 w-full",
              value: newFilament.price || 0,
              type: "number",
              onChange: (e) => setNewFilament({
                ...newFilament,
                price: Number(e.target.value)
              })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2", children: "€" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1", children: [
        "Brand",
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-gray-900 rounded-lg pl-2 p-1",
            value: newFilament.brand || "",
            onChange: (e) => setNewFilament({ ...newFilament, brand: e.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1", children: [
        "Material",
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-gray-900 rounded-lg pl-2 p-1",
            value: newFilament.material || "",
            onChange: (e) => setNewFilament({
              ...newFilament,
              material: e.target.value
            })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1", children: [
        "Color",
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-gray-900 rounded-lg pl-2 p-1",
            value: newFilament.color || "",
            onChange: (e) => setNewFilament({ ...newFilament, color: e.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1", children: [
        "Image",
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-gray-900 rounded-lg pl-2 p-1",
            value: newFilament.image || "",
            onChange: (e) => setNewFilament({ ...newFilament, image: e.target.value })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-5 gap-4", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 col-span-3", children: [
        "Quantity",
        /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-row", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "bg-gray-900 rounded-lg pl-2 p-1 w-full",
              type: "number",
              value: newFilament.quantity || "",
              onChange: (e) => setNewFilament({
                ...newFilament,
                quantity: Number(e.target.value)
              })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "-ml-10 mt-1", children: newFilament.unit })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 col-span-2", children: [
        "Unit",
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "bg-gray-900 rounded-lg pl-2 p-1",
            value: newFilament.unit,
            onChange: (e) => setNewFilament({
              ...newFilament,
              unit: e.target.value
            }),
            children: [
              /* @__PURE__ */ jsx("option", { value: "g", children: "grams" }),
              /* @__PURE__ */ jsx("option", { value: "ml", children: "milliliters" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
const NewFilament = {
  id: void 0,
  brand: "",
  color: "",
  description: "",
  image: "",
  material: "",
  name: "",
  price: 0,
  quantity: 0,
  unit: "ml"
};
function Filaments({ initialFilaments }) {
  const [filaments, setFilaments] = useState(initialFilaments);
  const [selectedFilament, setSelectedFilament] = useState(initialFilaments[0]);
  const [newFilament, setNewFilament] = useState(NewFilament);
  const submit = useSubmit();
  function createFilament2() {
    if (!newFilament.name || !newFilament.image || newFilament.price <= 0) {
      console.log("Please fill in all required fields with valid values.");
      return;
    }
    submit(
      { filamentData: JSON.stringify(newFilament), _action: "create" },
      { method: "post", encType: "multipart/form-data" }
    );
    setFilaments([...filaments, { ...newFilament, id: Date.now() }]);
    setNewFilament(NewFilament);
  }
  function updateFilament2() {
    if (!newFilament.name || !newFilament.image || newFilament.price <= 0) {
      console.log("Please fill in all required fields with valid values.");
      return;
    }
    submit(
      { filamentData: JSON.stringify(newFilament), _action: "update" },
      { method: "put", encType: "multipart/form-data" }
    );
    setNewFilament(NewFilament);
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "mt-[130px] h-[calc(100vh-130px)] max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx(
      FilamentsList,
      {
        data: filaments,
        selectedFilament,
        setSelectedFilament
      }
    ),
    /* @__PURE__ */ jsx(
      FilamentDetails,
      {
        selectedFilament,
        setNewFilament
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-700 rounded-lg p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-xl mb-4", children: [
          newFilament.id == void 0 ? "Add" : "Update",
          " a Filament"
        ] }),
        /* @__PURE__ */ jsx(
          BaseInfos,
          {
            newFilament,
            setNewFilament
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
        newFilament.image ? /* @__PURE__ */ jsx(
          "img",
          {
            src: newFilament.image,
            alt: "Filament preview",
            className: "h-64 w-full rounded-lg object-cover border border-gray-700"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "h-64 w-full rounded-lg border border-gray-700 flex items-center justify-center text-gray-500", children: "Filament image preview" }),
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 w-full", children: [
          "Description",
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "bg-gray-900 min-h-32 rounded-lg pl-2 p-1 resize-none",
              value: newFilament.description || "",
              onChange: (e) => setNewFilament({
                ...newFilament,
                description: e.target.value
              })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "max-w-24 p-2  bg-gray-900 rounded-lg border border-gray-700",
          onClick: () => newFilament.id == void 0 ? createFilament2() : updateFilament2(),
          children: newFilament.id == void 0 ? "Add" : "Update"
        }
      )
    ] })
  ] }) });
}
const meta$5 = () => {
  return [
    { title: "Filaments" },
    { name: "Filaments", content: "List of configured filaments" }
  ];
};
async function loader$5({}) {
  const filaments = getAllFilaments();
  return { filaments };
}
async function action$3({ request }) {
  const formData = await request.formData();
  const actionType = formData.get("_action");
  if (actionType === "delete") {
    const filamentId = Number(formData.get("filamentId"));
    deleteFilament(filamentId);
    return { success: true };
  }
  if (actionType === "create") {
    const filamentData = JSON.parse(
      formData.get("filamentData")
    );
    const newFilament = createFilament(filamentData);
    return { success: true, filament: newFilament };
  }
  if (actionType === "update") {
    const filamentData = JSON.parse(
      formData.get("filamentData")
    );
    const updatedFilament = updateFilament(filamentData);
    return { success: true, filament: updatedFilament };
  }
  return { success: false };
}
function FilamentsPage() {
  const { filaments } = useLoaderData();
  return /* @__PURE__ */ jsx(Filaments, { initialFilaments: filaments });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: FilamentsPage,
  loader: loader$5,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function Invoices() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "mt-[130px] h-[calc(100vh-130px)] max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "bg-gray-800 p-4 rounded-lg", children: " coucou " }) }) });
}
const meta$4 = () => {
  return [
    { title: "Invoices" },
    { name: "Invoices", content: "List of invoices" }
  ];
};
async function loader$4({}) {
  const consos = getAllConso();
  const printers = getAllPrinters();
  const filaments = getAllFilaments();
  const prints = getAllPrints();
  return { consos, printers, filaments, prints };
}
function InvoicessPage() {
  const { consos, printers, filaments, prints } = useLoaderData();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Invoices, {}) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: InvoicessPage,
  loader: loader$4,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function PrinterDetails({
  selectedPrinter,
  setNewPrinter
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl m-4 rounded-xl border border-gray-700 grid grid-cols-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full p-2 col-span-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between mr-2 p-2 text-xl", children: [
        /* @__PURE__ */ jsx("div", { children: selectedPrinter.name }),
        /* @__PURE__ */ jsx("div", { children: selectedPrinter.price + " €" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-base mb-2", children: "Options:" }),
        /* @__PURE__ */ jsx("div", { className: "max-h-60 overflow-y-auto", children: /* @__PURE__ */ jsx(
          GenericTable,
          {
            data: selectedPrinter.upgrades,
            headers: [
              { key: "installDate", label: "Date" },
              { key: "name", label: "Name" },
              { key: "price", label: "Price" }
            ],
            showRemoveButton: false
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-2 overflow-hidden", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-base mb-2", children: "Consumables:" }),
        /* @__PURE__ */ jsx("div", { className: "max-h-60 overflow-y-auto", children: /* @__PURE__ */ jsx(
          GenericTable,
          {
            data: selectedPrinter.consumables,
            headers: [
              { key: "name", label: "Name" },
              { key: "lifeTime", label: "Expected Lifetime" },
              { key: "usedTime", label: "Used Time" },
              { key: "price", label: "Price" }
            ],
            showRemoveButton: false
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "justify-self-end w-full h-full", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: selectedPrinter.image,
          alt: selectedPrinter.name,
          className: "h-full w-full rounded-r-xl object-cover"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "col-span-2 relative -inset-y-12 -inset-x-4 flex justify-end gap-4 ", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "bg-gray-800 py-2 px-4 rounded-lg flex flex-row gap-2",
            onClick: () => setNewPrinter(selectedPrinter),
            children: [
              /* @__PURE__ */ jsx(PencilSquareIcon, { height: 24 }),
              "Edit"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("form", { method: "post", children: [
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "_action", value: "delete" }),
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "printerId", value: selectedPrinter.id }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              className: "bg-red-800 py-2 px-4 rounded-lg flex flex-row gap-2",
              children: [
                /* @__PURE__ */ jsx(TrashIcon, { height: 24 }),
                "Delete"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function PrintersList({
  printers,
  selectedPrinter,
  onSelectPrinter
}) {
  return /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto flex flex-row gap-0 overflow-x-auto relative", children: printers.map((printer, index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex-shrink-0 flex flex-row m-2 min-w-72 border border-gray-700
					rounded-xl relative cursor-pointer
					${selectedPrinter == printer ? "bg-gray-900" : ""}`,
      onClick: () => onSelectPrinter(printer),
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: printer.image,
            className: "h-24 w-24 rounded-s-xl",
            alt: printer.name
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-2 text-sm justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("div", { children: printer.name }),
            /* @__PURE__ */ jsx("div", { children: printer.price + " €" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative group", children: /* @__PURE__ */ jsx("div", { className: "text-xs", children: printer.upgrades.length + " Options" }) })
        ] })
      ]
    },
    index
  )) });
}
function NewPrinterBase({
  setNewPrinter,
  newPrinter
}) {
  return /* @__PURE__ */ jsxs(Form, { className: "grid grid-cols-3 grid-flow-row w-full gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", htmlFor: "printerName", children: [
        "Name",
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-gray-900 rounded-lg pl-2 p-1",
            id: "printerName",
            value: newPrinter.name || "",
            onChange: (e) => setNewPrinter({ ...newPrinter, name: e.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", htmlFor: "printerCost", children: [
        "Price",
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "bg-gray-900 rounded-lg pl-2 p-1 w-full text-right",
              id: "printerCost",
              type: "number",
              value: newPrinter.price || "",
              onChange: (e) => setNewPrinter({
                ...newPrinter,
                price: Number(e.target.value)
              })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2", children: "€" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", htmlFor: "printerImage", children: [
        "Image",
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-gray-900 rounded-lg pl-2 p-1",
            id: "printerImage",
            value: newPrinter.image || "",
            onChange: (e) => setNewPrinter({
              ...newPrinter,
              image: e.target.value
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "label",
        {
          className: "flex flex-col gap-1 mb-2",
          htmlFor: "printerConsumption",
          children: [
            "Consumption (kw/h)",
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "bg-gray-900 rounded-lg pl-2 p-1 w-full text-right",
                  id: "printerConsumption",
                  type: "number",
                  value: newPrinter.consumption || "",
                  onChange: (e) => setNewPrinter({
                    ...newPrinter,
                    consumption: Number(e.target.value)
                  })
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "ml-2", children: "kW/h" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "justify-self-end w-full h-full", children: newPrinter.image ? /* @__PURE__ */ jsx(
      "img",
      {
        src: newPrinter.image,
        alt: "Printer preview",
        className: "h-full w-full rounded-r-xl object-cover border border-gray-700"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "h-full w-full rounded-r-xl border border-gray-700 flex items-center justify-center text-gray-500", children: "Printer image preview" }) })
  ] });
}
function NewPrinterForm({
  newPrinter,
  setNewPrinter,
  newConsumable,
  setNewConsumable,
  newUpgrade,
  setNewUpgrade,
  newPrinterAddConsumable,
  newPrinterRemoveConsumable,
  newPrinterAddUpgrade,
  newPrinterRemoveUpgrade,
  createPrinter: createPrinter2,
  updatePrinter: updatePrinter2
}) {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto justify-between m-4 min-h-max rounded-xl border border-gray-700 p-2", children: [
    /* @__PURE__ */ jsxs("h1", { className: "mb-2", children: [
      newPrinter.id == void 0 ? "Ajouter" : "Modifier",
      " une imprimante"
    ] }),
    /* @__PURE__ */ jsxs(TabGroup, { className: "ml-4 border border-gray-700 rounded-lg my-6 p-2 pb-6 ", children: [
      /* @__PURE__ */ jsxs(TabList, { className: "mb-4", children: [
        /* @__PURE__ */ jsx(Tab, { className: "py-2 px-4 data-[selected]:bg-gray-900 rounded-lg", children: "Base infos" }),
        /* @__PURE__ */ jsx(Tab, { className: "py-2 px-4 data-[selected]:bg-gray-900 rounded-lg", children: "Consumables" }),
        /* @__PURE__ */ jsx(Tab, { className: "py-2 px-4 data-[selected]:bg-gray-900 rounded-lg", children: "Options" })
      ] }),
      /* @__PURE__ */ jsxs(TabPanels, { className: "ml-4", children: [
        /* @__PURE__ */ jsx(TabPanel, { className: "", children: /* @__PURE__ */ jsx(
          NewPrinterBase,
          {
            setNewPrinter,
            newPrinter
          }
        ) }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4", children: [
          newPrinter.consumables.length ? /* @__PURE__ */ jsx("div", { className: "w-full h-full overflow-y-auto max-h-80", children: /* @__PURE__ */ jsx(
            GenericTable,
            {
              data: newPrinter.consumables,
              headers: [
                { key: "name", label: "Name" },
                { key: "lifeTime", label: "Expected lifetime" },
                { key: "usedTime", label: "Time of use" }
              ],
              removeElement: newPrinterRemoveConsumable
            }
          ) }) : /* @__PURE__ */ jsxs("div", { className: "text-center text-3xl w-full", children: [
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "no consumables"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-56", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
              "Name of consumable",
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "bg-gray-900 rounded-lg pl-2 p-1 w-full",
                  value: newConsumable.name,
                  onChange: (e) => setNewConsumable({
                    ...newConsumable,
                    name: e.target.value
                  })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
              "Expected lifetime",
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "bg-gray-900 rounded-lg pl-2 py-1 w-full text-right",
                    type: "number",
                    value: newConsumable.lifeTime,
                    onChange: (e) => setNewConsumable({
                      ...newConsumable,
                      lifeTime: Number(e.target.value)
                    })
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2", children: "H" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
              "Used time",
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "bg-gray-900 rounded-lg pl-2 p-1 w-full text-right",
                    type: "number",
                    value: newConsumable.usedTime,
                    onChange: (e) => setNewConsumable({
                      ...newConsumable,
                      usedTime: Number(e.target.value)
                    })
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2", children: "H" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
              "Price",
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "bg-gray-900 rounded-lg pl-2 p-1 w-full text-right",
                    type: "number",
                    value: newConsumable.price,
                    onChange: (e) => setNewConsumable({
                      ...newConsumable,
                      price: Number(e.target.value)
                    })
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2", children: "€" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "py-2 px-4 bg-gray-900 rounded-lg border w-full mt-2",
                onClick: newPrinterAddConsumable,
                children: "Ajouter"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4", children: [
          newPrinter.upgrades.length ? /* @__PURE__ */ jsx("div", { className: "w-full max-h-72 overflow-y-auto", children: /* @__PURE__ */ jsx(
            GenericTable,
            {
              data: newPrinter.upgrades,
              headers: [
                { key: "name", label: "Name" },
                { key: "price", label: "Price" },
                { key: "installDate", label: "Date of install" }
              ],
              removeElement: newPrinterRemoveUpgrade
            }
          ) }) : /* @__PURE__ */ jsxs("div", { className: "text-center text-3xl w-full", children: [
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "no upgrades"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-56", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
              "Name of upgrade",
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "bg-gray-900 rounded-lg pl-2 p-1 w-full",
                  onChange: (e) => setNewUpgrade({
                    ...newUpgrade,
                    name: e.target.value
                  })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
              "Price",
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "bg-gray-900 rounded-lg pl-2 p-1 w-full text-right",
                    type: "number",
                    onChange: (e) => setNewUpgrade({
                      ...newUpgrade,
                      price: Number(e.target.value)
                    })
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2", children: "€" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 mb-2", children: [
              "Install date",
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                "input",
                {
                  className: "bg-gray-900 rounded-lg pl-2 p-1 w-full",
                  type: "date",
                  dir: "rtl",
                  onChange: (e) => setNewUpgrade({
                    ...newUpgrade,
                    installDate: e.target.value
                  })
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "py-2 px-4 bg-gray-900 rounded-lg border w-full mt-2",
                onClick: newPrinterAddUpgrade,
                children: "Ajouter"
              }
            )
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-gradient-to-t from-gray-900 to-gray-800 m-2 p-2 px-4 rounded-lg border",
        onClick: newPrinter.id == void 0 ? createPrinter2 : updatePrinter2,
        children: newPrinter.id == void 0 ? "Create " : "Update"
      }
    )
  ] });
}
const NewPrinter = {
  image: "",
  name: "",
  price: 0,
  consumption: 0,
  upgrades: [],
  consumables: [],
  canPrint: []
};
const NewConsumable = {
  lifeTime: 0,
  name: "",
  usedTime: 0,
  price: 0
};
const NewUpgrade = {
  name: "",
  price: 0,
  installDate: ""
};
function Printers({ initialPrinters }) {
  const [printers, setPrinters] = useState(initialPrinters);
  const [selectedPrinter, setSelectedPrinter] = useState(initialPrinters[0]);
  const [newPrinter, setNewPrinter] = useState(NewPrinter);
  const [newConsumable, setNewConsumable] = useState(NewConsumable);
  const [newUpgrade, setNewUpgrade] = useState(NewUpgrade);
  const submit = useSubmit();
  function newPrinterAddConsumable() {
    const updatedConsumables = [...newPrinter.consumables];
    updatedConsumables.push(newConsumable);
    setNewPrinter({
      ...newPrinter,
      consumables: updatedConsumables
    });
    console.log(newPrinter.consumables);
  }
  function newPrinterRemoveConsumable(consumable) {
    const newConsumables = [...newPrinter.consumables].filter((elem) => {
      const isSameConsumable = elem.name === consumable.name && elem.lifeTime === consumable.lifeTime && elem.price === consumable.price && elem.usedTime === consumable.usedTime;
      return !isSameConsumable;
    });
    setNewPrinter({
      ...newPrinter,
      consumables: newConsumables
    });
  }
  function newPrinterAddUpgrade() {
    const updatedUpgrades = [...newPrinter.upgrades];
    console.log(newPrinter.upgrades);
    updatedUpgrades.push(newUpgrade);
    setNewPrinter({
      ...newPrinter,
      upgrades: updatedUpgrades
    });
    console.log(newPrinter.upgrades);
  }
  function newPrinterRemoveUpgrade(upgrade) {
    const newUpgrades = [...newPrinter.upgrades].filter((elem) => {
      const isSameUpgrade = elem.name === upgrade.name && elem.installDate === upgrade.installDate && elem.price === upgrade.price;
      return !isSameUpgrade;
    });
    setNewPrinter({
      ...newPrinter,
      upgrades: newUpgrades
    });
  }
  function createPrinter2() {
    if (!newPrinter.name || !newPrinter.image || newPrinter.price <= 0) {
      console.log("Please fill in all required fields with valid values.");
      return;
    }
    submit(
      { printerData: JSON.stringify(newPrinter), _action: "create" },
      { method: "post", encType: "multipart/form-data" }
    );
    setPrinters([...printers, { ...newPrinter, id: Date.now() }]);
    setNewPrinter(NewPrinter);
  }
  function updatePrinter2() {
    if (!newPrinter.name || !newPrinter.image || newPrinter.price <= 0) {
      console.log("Please fill in all required fields with valid values.");
      return;
    }
    submit(
      { printerData: JSON.stringify(newPrinter), _action: "update" },
      { method: "put", encType: "multipart/form-data" }
    );
    setNewPrinter(NewPrinter);
    setTimeout(() => window.location.reload(), 10);
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "mt-[130px] h-[calc(100vh-130px)]", children: [
    /* @__PURE__ */ jsx(
      PrintersList,
      {
        printers,
        selectedPrinter,
        onSelectPrinter: (printer) => setSelectedPrinter(printer)
      }
    ),
    /* @__PURE__ */ jsx(
      PrinterDetails,
      {
        selectedPrinter,
        setNewPrinter
      }
    ),
    /* @__PURE__ */ jsx(
      NewPrinterForm,
      {
        newPrinter,
        setNewPrinter,
        newConsumable,
        setNewConsumable,
        newUpgrade,
        setNewUpgrade,
        newPrinterAddConsumable,
        newPrinterRemoveConsumable,
        newPrinterAddUpgrade,
        newPrinterRemoveUpgrade,
        createPrinter: createPrinter2,
        updatePrinter: updatePrinter2
      }
    )
  ] }) });
}
async function loader$3({}) {
  const printers = getAllPrinters();
  return { printers };
}
const meta$3 = () => {
  return [
    { title: "Printers" },
    { name: "Printers", content: "List of configured printers" }
  ];
};
async function action$2({ request }) {
  const formData = await request.formData();
  const actionType = formData.get("_action");
  if (actionType === "delete") {
    const printerId = Number(formData.get("printerId"));
    deletePrinter(printerId);
    return { success: true };
  }
  if (actionType === "create") {
    const printerData = JSON.parse(formData.get("printerData"));
    const newPrinter = createPrinter(printerData);
    return { success: true, printer: newPrinter };
  }
  if (actionType === "update") {
    const printerData = JSON.parse(formData.get("printerData"));
    const updatedPrinter = updatePrinter(printerData);
    return { success: true, printer: updatedPrinter };
  }
  return { success: false };
}
function PrintersPage() {
  const { printers } = useLoaderData();
  return /* @__PURE__ */ jsx(Printers, { initialPrinters: printers });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: PrintersPage,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md"
}) {
  const modalRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEscape);
      if (modalRef.current) {
        modalRef.current.focus();
      }
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;
  const modalContent = /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      onClick: handleBackdropClick,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: modalRef,
          className: `bg-gray-800 p-6 rounded-lg ${maxWidth} w-full mx-4 max-h-[90vh] overflow-y-auto`,
          tabIndex: -1,
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "modal-title",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsx("h2", { id: "modal-title", className: "text-xl font-bold", children: title }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  className: "text-gray-400 hover:text-white text-2xl leading-none",
                  "aria-label": "Close modal",
                  children: "×"
                }
              )
            ] }),
            children
          ]
        }
      )
    }
  );
  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}
function Clients({ clients }) {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [editClient, setEditClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const fetcher = useFetcher();
  const handleEditOpen = (client) => {
    setSelectedClient(client);
    setEditClient({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address
    });
    setIsEditOpen(true);
  };
  const handleCreateClient = () => {
    fetcher.submit(
      {
        action: "create",
        ...newClient
      },
      { method: "POST" }
    );
    setNewClient({ name: "", email: "", phone: "", address: "" });
    setIsNewOpen(false);
  };
  const handleUpdateClient = () => {
    if (!selectedClient) return;
    fetcher.submit(
      {
        action: "update",
        id: selectedClient.id.toString(),
        ...editClient
      },
      { method: "POST" }
    );
    setIsEditOpen(false);
    setSelectedClient(null);
  };
  const handleDeleteClient = (clientId) => {
    if (confirm("Are you sure you want to delete this client?")) {
      fetcher.submit(
        {
          action: "delete",
          id: clientId.toString()
        },
        { method: "POST" }
      );
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Modal,
      {
        isOpen: isEditOpen,
        onClose: () => {
          setIsEditOpen(false);
          setSelectedClient(null);
        },
        title: `Edit Client: ${(selectedClient == null ? void 0 : selectedClient.name) || ""}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Client Name",
                value: editClient.name,
                onChange: (e) => setEditClient({ ...editClient, name: e.target.value }),
                className: "w-full p-2 bg-gray-700 rounded"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                placeholder: "Email",
                value: editClient.email,
                onChange: (e) => setEditClient({ ...editClient, email: e.target.value }),
                className: "w-full p-2 bg-gray-700 rounded"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                placeholder: "Phone",
                value: editClient.phone,
                onChange: (e) => setEditClient({ ...editClient, phone: e.target.value }),
                className: "w-full p-2 bg-gray-700 rounded"
              }
            ),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                placeholder: "Address",
                value: editClient.address,
                onChange: (e) => setEditClient({ ...editClient, address: e.target.value }),
                className: "w-full p-2 bg-gray-700 rounded",
                rows: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 mt-6", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsEditOpen(false),
                className: "bg-gray-600 text-white px-4 py-2 rounded",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleUpdateClient,
                className: "bg-blue-500 text-white px-4 py-2 rounded",
                children: "Save"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Modal,
      {
        isOpen: isNewOpen,
        onClose: () => setIsNewOpen(false),
        title: "New Client",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Client Name",
                value: newClient.name,
                onChange: (e) => setNewClient({ ...newClient, name: e.target.value }),
                className: "w-full p-2 bg-gray-700 rounded"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                placeholder: "Email",
                value: newClient.email,
                onChange: (e) => setNewClient({ ...newClient, email: e.target.value }),
                className: "w-full p-2 bg-gray-700 rounded"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                placeholder: "Phone",
                value: newClient.phone,
                onChange: (e) => setNewClient({ ...newClient, phone: e.target.value }),
                className: "w-full p-2 bg-gray-700 rounded"
              }
            ),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                placeholder: "Address",
                value: newClient.address,
                onChange: (e) => setNewClient({ ...newClient, address: e.target.value }),
                className: "w-full p-2 bg-gray-700 rounded",
                rows: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 mt-6", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsNewOpen(false),
                className: "bg-gray-600 text-white px-4 py-2 rounded",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleCreateClient,
                className: "bg-green-500 text-white px-4 py-2 rounded",
                children: "Create"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: " mt-[130px] p-4 w-full max-w-7xl mx-auto flex flex-col gap-8 items-center justify-center border border-gray-700 rounded-lg", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-between w-full", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsNewOpen(true),
          className: "bg-blue-500 text-white px-4 py-2 rounded",
          children: "New Client"
        }
      ) }),
      clients.map((client) => /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-700 w-full", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: client.name }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Email: ",
          client.email
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Phone: ",
          client.phone
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Address: ",
          client.address
        ] }),
        client.prints && client.prints.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Prints:" }),
          /* @__PURE__ */ jsx("ul", { children: client.prints.map((print) => /* @__PURE__ */ jsxs("li", { className: "mt-1", children: [
            print.name,
            " -",
            " ",
            new Date(print.date).toLocaleDateString("fr-FR")
          ] }, print.id)) })
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2 mt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleEditOpen(client),
              className: "bg-yellow-500 text-white px-4 py-2 rounded",
              children: "Edit"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDeleteClient(client.id),
              className: "bg-red-500 text-white px-4 py-2 rounded",
              children: "Delete"
            }
          )
        ] })
      ] }, client.id))
    ] })
  ] });
}
function getClients() {
  const clients = db.prepare(`SELECT * FROM clients ORDER BY id;`).all();
  const prints = getAllPrints();
  return clients.map((client) => ({
    ...client,
    prints: prints.filter((print) => print.clientId === client.id)
  }));
}
function updateClient(client) {
  const nb = db.prepare(
    `update clients set name = ?, email = ?, phone = ?, address = ?
		WHERE id = ?`
  ).run(
    client.name,
    client.email,
    client.phone,
    client.address,
    client.id
  ).changes;
  return nb;
}
function deleteClient(id) {
  const result = db.prepare(`UPDATE clients SET archived = 1 WHERE id = ?`).run(id);
  return result.changes > 0;
}
function createClient(client) {
  db.prepare(
    `insert into clients (name, email, phone, address)
		values (?, ?, ?, ?);`
  ).run(client.name, client.email, client.phone, client.address);
}
const meta$2 = () => {
  return [
    { title: "Clients" },
    { name: "Clients", content: "List of clients" }
  ];
};
async function loader$2({}) {
  const clients = getClients();
  return { clients };
}
async function action$1({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("action");
  switch (action2) {
    case "create": {
      const client = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address")
      };
      createClient(client);
      return { success: true };
    }
    case "update": {
      const client = {
        id: parseInt(formData.get("id")),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address")
      };
      updateClient(client);
      return { success: true };
    }
    case "delete": {
      const id = parseInt(formData.get("id"));
      deleteClient(id);
      return { success: true };
    }
    default:
      return { success: false };
  }
}
function ClientsPage() {
  const { clients } = useLoaderData();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Clients, { clients }) });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: ClientsPage,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function Mainpage({
  printersData,
  filamentsData
}) {
  useEffect(() => {
    console.log(printersData);
  }, [printersData]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      className: " mt-[130px] p-4 w-full max-w-7xl mx-auto\n			 flex items-center justify-center border border-gray-700 rounded-lg",
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-16", children: [
        /* @__PURE__ */ jsx("header", { className: "flex flex-col items-center gap-9 border border-gray-700 p-2 rounded-lg", children: /* @__PURE__ */ jsx("h1", { className: "leading text-2xl font-bold text-gray-100 border p-2", children: "Welcome" }) }),
        /* @__PURE__ */ jsxs("div", { className: " border border-gray-700 rounded-lg p-2", children: [
          "Most used printers:",
          /* @__PURE__ */ jsx("div", { children: printersData && printersData.map((dataline, idx) => {
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-2 flex flex-row justify-between border-b border-b-gray-700",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2", children: [
                    dataline.nbPrints,
                    " ",
                    "prints",
                    /* @__PURE__ */ jsx("div", { className: "bg-blue-200 w-[1px]" }),
                    dataline.printer.name
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "ml-4", children: new Date(dataline.lastPrintDate).toLocaleDateString(
                    "fr-FR"
                  ) })
                ]
              },
              idx
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: " border border-gray-700 rounded-lg p-2", children: [
          "Most used filaments:",
          /* @__PURE__ */ jsx("div", { children: filamentsData && filamentsData.map((dataline, idx) => {
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-2 flex flex-row justify-between border-b border-b-gray-700",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2", children: [
                    dataline.nbPrints,
                    " ",
                    "prints",
                    /* @__PURE__ */ jsx("div", { className: "bg-blue-200 w-[1px]" }),
                    dataline.filament.name
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "ml-4", children: new Date(dataline.lastPrintDate).toLocaleDateString(
                    "fr-FR"
                  ) })
                ]
              },
              idx
            );
          }) })
        ] })
      ] })
    }
  ) });
}
function getPrintersUsage() {
  let returnElems = [];
  const printersStats = db.prepare(
    `
			SELECT
				printerUsed,
				max(date) as lastPrint,
				count(id) as nbPrints
			FROM
				prints
			GROUP BY
				printerUsed
			ORDER BY
				nbPrints desc,
				lastPrint desc;
			`
  ).all();
  printersStats.map((printer) => {
    returnElems.push({
      lastPrintDate: printer.lastPrint,
      nbPrints: printer.nbPrints,
      printer: getPrinterById(printer.printerUsed)
    });
  });
  return returnElems;
}
function getFilamentsUsage() {
  let returnElems = [];
  const filamentsStats = db.prepare(
    `
			SELECT 
				json_each.value AS filamentId,
				COUNT(*) AS nbPrints,
				MAX(date) as lastPrint
			FROM
				prints,
				json_each(prints.filamentsUsed)
			GROUP BY
				filamentId
			ORDER BY
				nbPrints DESC;

			`
  ).all();
  filamentsStats.map((printer) => {
    returnElems.push({
      lastPrintDate: printer.lastPrint,
      nbPrints: printer.nbPrints,
      filament: getFilamentById(printer.filamentId)
    });
  });
  return returnElems;
}
function getPrinterById(id) {
  const printer = db.prepare(
    `
		SELECT * FROM printers WHERE id = ?
	`
  ).get(id);
  if (!printer) return null;
  const upgrades = db.prepare(
    `
		SELECT id, name, price, installDate FROM upgrades
		WHERE printerId = ?
	`
  ).all(printer.id);
  const consumables = db.prepare(
    `
		SELECT id, name, lifeTime, usedTime, price FROM consumables
		WHERE printerId = ?
	`
  ).all(printer.id);
  return {
    ...printer,
    upgrades,
    consumables
  };
}
const meta$1 = () => {
  return [
    { title: "Coucou" },
    { name: "description", content: "Welcome to the jungle!" }
  ];
};
async function loader$1({}) {
  const printersData = getPrintersUsage();
  const filamentsData = getFilamentsUsage();
  return { printersData, filamentsData };
}
function Index() {
  const { printersData, filamentsData } = useLoaderData();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Mainpage, { printersData, filamentsData }) });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function Print({
  Item,
  Filaments: Filaments2,
  Printer: Printer2,
  consos,
  elecPrice
}) {
  var _a;
  function convert(n) {
    if (n < 60) return n.toString();
    return `0${n / 60 ^ 0}`.slice(-2) + ":" + ("0" + n % 60).slice(-2);
  }
  function calculatePriceElec() {
    const hToPrint = Item.timeToPrint / 60;
    const totalConso = consos.reduce((a, b) => {
      return a + b.consoKw;
    }, 0);
    const totalPrice = elecPrice * hToPrint * (totalConso / 1e3);
    return totalPrice;
  }
  function calculatePriceFil() {
    let total = 0;
    Filaments2.map((filament, idx) => {
      const priceForFilament = filament.price / 1e3 * Item.filamentsQuantity[idx];
      total += priceForFilament;
    });
    return total;
  }
  function calculatePriceWork() {
    let total = 0;
    Filaments2.map((filament, idx) => {
      const priceForFilament = filament.price / 1e3 * Item.filamentsQuantity[idx];
      total += priceForFilament;
    });
    return total;
  }
  const fetcher = useFetcher();
  if (fetcher.state === "idle" && fetcher.data && fetcher.data.success && ((_a = fetcher.formData) == null ? void 0 : _a.get("_action")) === "delete") {
    window.dispatchEvent(
      new CustomEvent("print-deleted", { detail: { id: Item.id } })
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "group border relative border-gray-700 rounded-lg min-h-72 h-full grow", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: `/prints/${Item.id}/edit`,
          className: "text-s px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-600",
          children: "Edit"
        }
      ),
      /* @__PURE__ */ jsxs(fetcher.Form, { method: "post", children: [
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "_action", value: "delete" }),
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "printId", value: Item.id }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: fetcher.state !== "idle",
            className: "text-s px-3 py-1 rounded-lg bg-red-900 hover:bg-red-800 border border-red-700 disabled:opacity-50",
            children: fetcher.state === "submitting" ? "..." : "Archive"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between border-b border-gray-700", children: [
      Item.image != "" ? /* @__PURE__ */ jsx("div", { className: "h-32 w-32 min-h-32 min-w-32 overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          className: "h-full w-full object-cover rounded-tl-lg",
          src: `${Item.image.replace("/", "")}`
        }
      ) }) : /* @__PURE__ */ jsx("div", { className: "h-32 w-32 min-h-32 min-w-32 rounded-tl-lg bg-[repeating-linear-gradient(to_bottom_right,#374151_0px,#374151_20px,#1f2937_20px,#1f2937_40px)]" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-end items-end w-fit p-2 justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "px-2 text-3xl font-semibold", children: Item.name }),
        /* @__PURE__ */ jsx("div", { className: "px-1 text-lg", children: new Date(Item.date).toLocaleDateString("fr-FR") })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2 w-fit m-2 p-2 ", children: [
      /* @__PURE__ */ jsx("img", { src: "/printer.svg", className: "h-8 invert" }),
      Printer2 && /* @__PURE__ */ jsx("div", { children: Printer2.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2 border-t border-b border-gray-800 p-2 my-2", children: [
      /* @__PURE__ */ jsx("img", { src: "/filament.svg", className: "h-8 ml-2 invert" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: Filaments2.length > 0 && Filaments2.map((filament, idx) => /* @__PURE__ */ jsxs("div", { children: [
        Item.filamentsQuantity[idx],
        " ",
        filament.unit,
        " ",
        filament.name,
        " (",
        filament.material,
        ")"
      ] }, filament.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-fit m-2 p-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2 items-center", children: [
      /* @__PURE__ */ jsx("img", { src: "/clock.svg", className: "h-6 ml-1 invert" }),
      /* @__PURE__ */ jsxs("div", { children: [
        Item.timeToPrint,
        "mins ",
        Item.timeToPrint > 59 && `(${convert(Item.timeToPrint)}h)`
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: " border-t m-2 p-2", children: [
      consos.length == 0 && /* @__PURE__ */ jsx("div", { children: "no conso info for this printer and materials" }),
      consos.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          calculatePriceElec().toFixed(2),
          " € elec"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          calculatePriceFil().toFixed(2),
          " € filament"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          calculatePriceWork().toFixed(2),
          " € work"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          (calculatePriceFil() + calculatePriceElec() + calculatePriceWork()).toFixed(2),
          " € total"
        ] })
      ] })
    ] })
  ] });
}
function FilterSort({
  rows,
  selectedRow,
  setSelectedSort,
  initialPrints,
  setFilteredPrints
}) {
  function handleSort(rowIndex) {
    setSelectedSort(rowIndex);
    let sortedPrints = [...initialPrints];
    if (rowIndex === 0) {
      sortedPrints.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (rowIndex === 1) {
      sortedPrints.sort((a, b) => a.name.localeCompare(b.name));
    } else if (rowIndex === 2) {
      sortedPrints.sort((a, b) => a.timeToPrint - b.timeToPrint);
    }
    setFilteredPrints(sortedPrints);
  }
  return /* @__PURE__ */ jsxs(Popover, { className: "group min-w-52", children: [
    /* @__PURE__ */ jsxs(
      PopoverButton,
      {
        className: "flex flex-row w-full border\n					group-data-[open]:border-b-transparent group-data-[open]:rounded-b-none\n					border-gray-700 rounded-lg items-center justify-between gap-1",
        children: [
          selectedRow === -1 ? /* @__PURE__ */ jsx("div", { className: "p-2", children: "Sort by" }) : /* @__PURE__ */ jsx("div", { className: "p-2", children: rows[selectedRow] }),
          /* @__PURE__ */ jsx(
            ChevronDownIcon,
            {
              className: "align-bottom size-5 group-data-[open]:-rotate-180\n						transition duration-100"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      PopoverPanel,
      {
        "aria-orientation": "vertical",
        transition: true,
        anchor: "bottom",
        className: "divide-y divide-white/5 rounded-b-lg bg-black/95\n					text-sm/6 ease-in-out \n					[data-[closed]:-translate-y-1 data-[closed]:opacity-0\n					border border-gray-700 w-52",
        children: ({ close }) => /* @__PURE__ */ jsxs(Fragment, { children: [
          selectedRow > -1 && /* @__PURE__ */ jsx(
            "div",
            {
              className: "rounded-lg py-2 px-5 hover:bg-white/5 w-full block font-medium",
              onClick: () => {
                setSelectedSort(-1);
                setFilteredPrints(initialPrints);
                close();
              },
              children: /* @__PURE__ */ jsx("div", { className: "mt-2", children: "Default" })
            },
            "remove-filter"
          ),
          rows.map((row, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "rounded-lg py-2 px-5 hover:bg-white/5 w-full block font-medium",
              onClick: () => {
                handleSort(index);
                close();
              },
              children: /* @__PURE__ */ jsx("div", { className: "flex flex-row gap-4", children: /* @__PURE__ */ jsx("div", { className: "mt-2", children: row }) })
            },
            index
          ))
        ] })
      }
    )
  ] });
}
function Filter({
  initialPrints,
  setFilteredPrints,
  printers,
  filaments
}) {
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [selectedFil, setSelectedFil] = useState(null);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [sortDir, setSortDir] = useState(0);
  const sortRows = ["Date", "Name", "Print time"];
  function applyFiltersAndSorting() {
    let filtered = [...initialPrints];
    if (selectedPrinter) {
      filtered = filtered.filter(
        (print2) => print2.printerUsed === selectedPrinter.id
      );
    }
    if (selectedFil) {
      filtered = filtered.filter(
        (print2) => print2.filamentsUsed.includes(selectedFil.id)
      );
    }
    if (selectedRow === 0) {
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (selectedRow === 1) {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedRow === 2) {
      filtered.sort((a, b) => a.timeToPrint - b.timeToPrint);
    }
    if (sortDir) filtered.reverse();
    setFilteredPrints(filtered);
  }
  useEffect(() => {
    applyFiltersAndSorting();
  }, [selectedPrinter, selectedFil, selectedRow, sortDir]);
  return /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg flex flex-row basis-64 flex-wrap gap-4", children: [
    /* @__PURE__ */ jsx(
      FilterSelect,
      {
        items: printers,
        selectedItem: selectedPrinter,
        setSelectedItem: setSelectedPrinter,
        label: "Printer"
      }
    ),
    /* @__PURE__ */ jsx(
      FilterSelect,
      {
        items: filaments,
        selectedItem: selectedFil,
        setSelectedItem: setSelectedFil,
        label: "Filament"
      }
    ),
    /* @__PURE__ */ jsx(
      FilterSort,
      {
        rows: sortRows,
        selectedRow,
        setSelectedSort: setSelectedRow,
        initialPrints,
        setFilteredPrints
      }
    ),
    sortDir == 0 ? /* @__PURE__ */ jsx(
      "img",
      {
        className: "border border-gray-700 rounded-lg w-10 h-10 invert hover:invert-0 cursor-pointer hover:bg-white",
        src: "/sortUp.svg",
        alt: "SortUp",
        onClick: () => {
          setSortDir(1);
        }
      }
    ) : /* @__PURE__ */ jsx(
      "img",
      {
        className: "border border-gray-700 rounded-lg w-10 h-10 invert hover:invert-0 cursor-pointer hover:bg-white",
        src: "/sortDown.svg",
        alt: "SortUp",
        onClick: () => {
          setSortDir(0);
        }
      }
    )
  ] });
}
function Prints({
  initialPrints,
  Filaments: Filaments2,
  Printers: Printers2,
  consos,
  elecPrice
}) {
  const [filteredPrints, setFilteredPrints] = useState(initialPrints);
  useEffect(() => {
    setFilteredPrints(initialPrints);
  }, [initialPrints]);
  useEffect(() => {
    function handleDeleted(e) {
      const id = e.detail.id;
      setFilteredPrints((prev) => prev.filter((p) => p.id !== id));
    }
    window.addEventListener("print-deleted", handleDeleted);
    return () => window.removeEventListener("print-deleted", handleDeleted);
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "mt-[130px] h-[calc(100vh-130px)] max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsx(
      Filter,
      {
        initialPrints,
        setFilteredPrints,
        printers: Printers2,
        filaments: Filaments2
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "p-4 rounded-t-lg flex flex-row flex-wrap gap-2", children: filteredPrints.map((print2, idx) => {
      const printerConsos = consos.filter(
        (conso) => conso.printerId === print2.printerUsed
      );
      const filamentsUsed = Filaments2.filter((f) => {
        return (f == null ? void 0 : f.id) !== void 0 && print2.filamentsUsed.includes(f.id);
      });
      const usedConsos = printerConsos.filter((conso) => {
        return filamentsUsed.some(
          (filament) => filament.material === conso.filamentType
        );
      });
      return /* @__PURE__ */ jsx("div", { className: "basis-64 grow", children: /* @__PURE__ */ jsx(
        Print,
        {
          Item: print2,
          Filaments: filamentsUsed,
          Printer: Printers2.filter((p) => p.id === print2.printerUsed)[0],
          consos: usedConsos,
          elecPrice
        }
      ) }, idx);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "border border-gray-700 rounded-lg px-4 py-2 mx-4 -my-4 w-fit", children: [
      filteredPrints.length,
      " items"
    ] }),
    /* @__PURE__ */ jsx(
      Link,
      {
        className: "block my-16 mr-10 ml-auto w-fit rounded-full",
        to: "new",
        children: /* @__PURE__ */ jsx(PlusCircleIcon, { height: 72, color: "#4a92ff" })
      }
    )
  ] }) });
}
async function loader({}) {
  const prints = getAllPrints();
  const printers = getAllPrinters(true);
  const filaments = getAllFilaments();
  const consos = getAllConso();
  const elecPrice = getElecPrice();
  return { prints, printers, filaments, consos, elecPrice };
}
const meta = () => {
  return [
    { title: "Prints" },
    { name: "Prints", content: "List of done prints" }
  ];
};
async function action({ request }) {
  const formData = await request.formData();
  const actionType = formData.get("_action");
  if (actionType === "delete") {
    const printId = Number(formData.get("printId"));
    deletePrint(printId);
    return { success: true };
  }
  if (actionType === "create") {
    const printData = JSON.parse(formData.get("printData"));
    const newPrint = createPrint(printData);
    return { success: true, print: newPrint };
  }
  if (actionType === "update") {
    const printData = JSON.parse(formData.get("printData"));
    const updatedPrint = updatePrint(printData);
    return { success: true, print: updatedPrint };
  }
  return { success: false };
}
function PrintsPage() {
  const { prints, printers, filaments, consos, elecPrice } = useLoaderData();
  const location = useLocation();
  const isNestedRoute = location.pathname.toLowerCase() !== "/prints";
  if (isNestedRoute) {
    return /* @__PURE__ */ jsx(Outlet, {});
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Prints,
    {
      initialPrints: prints,
      Printers: printers,
      Filaments: filaments,
      consos,
      elecPrice
    }
  ) });
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: PrintsPage,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Rm-mshJ4.js", "imports": ["/assets/index-CKBIMJ8Q.js", "/assets/components-DqBg-pzF.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-C9JhmoKU.js", "imports": ["/assets/index-CKBIMJ8Q.js", "/assets/components-DqBg-pzF.js", "/assets/Navbar-LaI5eeax.js", "/assets/ChevronDownIcon-BVtRQATA.js", "/assets/use-resolve-button-type-B2Wslbw_.js"], "css": ["/assets/root-8YVfpPd9.css"] }, "routes/api.electricity": { "id": "routes/api.electricity", "parentId": "root", "path": "api/electricity", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.electricity-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/prints.$id.edit": { "id": "routes/prints.$id.edit", "parentId": "routes/prints", "path": ":id/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/prints._id.edit-D9wqJrpO.js", "imports": ["/assets/index-CKBIMJ8Q.js", "/assets/Navbar-LaI5eeax.js", "/assets/NewPrintForm-CqrryVo7.js", "/assets/components-DqBg-pzF.js", "/assets/ChevronDownIcon-BVtRQATA.js", "/assets/use-resolve-button-type-B2Wslbw_.js", "/assets/FilterSelect-B3842IOY.js"], "css": [] }, "routes/3MfExplorer": { "id": "routes/3MfExplorer", "parentId": "root", "path": "3MfExplorer", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/3MfExplorer-BcmyZwbE.js", "imports": ["/assets/index-CKBIMJ8Q.js"], "css": [] }, "routes/Electricity": { "id": "routes/Electricity", "parentId": "root", "path": "Electricity", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Electricity-BuFmHrPT.js", "imports": ["/assets/index-CKBIMJ8Q.js", "/assets/GenericTable-BvYFbjE6.js", "/assets/components-DqBg-pzF.js"], "css": [] }, "routes/prints.new": { "id": "routes/prints.new", "parentId": "routes/prints", "path": "new", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/prints.new-DXTse76p.js", "imports": ["/assets/index-CKBIMJ8Q.js", "/assets/NewPrintForm-CqrryVo7.js", "/assets/Navbar-LaI5eeax.js", "/assets/components-DqBg-pzF.js", "/assets/FilterSelect-B3842IOY.js", "/assets/ChevronDownIcon-BVtRQATA.js", "/assets/use-resolve-button-type-B2Wslbw_.js"], "css": [] }, "routes/Filaments": { "id": "routes/Filaments", "parentId": "root", "path": "Filaments", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Filaments-DjU3Mjzd.js", "imports": ["/assets/index-CKBIMJ8Q.js", "/assets/TrashIcon-BVHTyowk.js", "/assets/components-DqBg-pzF.js"], "css": [] }, "routes/Invoices": { "id": "routes/Invoices", "parentId": "root", "path": "Invoices", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Invoices-CNSr3ehQ.js", "imports": ["/assets/index-CKBIMJ8Q.js", "/assets/components-DqBg-pzF.js"], "css": [] }, "routes/Printers": { "id": "routes/Printers", "parentId": "root", "path": "Printers", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Printers-BpXMg9z9.js", "imports": ["/assets/index-CKBIMJ8Q.js", "/assets/GenericTable-BvYFbjE6.js", "/assets/TrashIcon-BVHTyowk.js", "/assets/components-DqBg-pzF.js", "/assets/use-resolve-button-type-B2Wslbw_.js"], "css": [] }, "routes/Clients": { "id": "routes/Clients", "parentId": "root", "path": "Clients", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Clients-CZ06A6Jn.js", "imports": ["/assets/index-CKBIMJ8Q.js", "/assets/components-DqBg-pzF.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-WKuW86WE.js", "imports": ["/assets/index-CKBIMJ8Q.js", "/assets/components-DqBg-pzF.js"], "css": [] }, "routes/prints": { "id": "routes/prints", "parentId": "root", "path": "prints", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/prints-DrUCvHuv.js", "imports": ["/assets/index-CKBIMJ8Q.js", "/assets/components-DqBg-pzF.js", "/assets/FilterSelect-B3842IOY.js", "/assets/ChevronDownIcon-BVtRQATA.js", "/assets/use-resolve-button-type-B2Wslbw_.js"], "css": [] } }, "url": "/assets/manifest-5c888fcb.js", "version": "5c888fcb" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/api.electricity": {
    id: "routes/api.electricity",
    parentId: "root",
    path: "api/electricity",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/prints.$id.edit": {
    id: "routes/prints.$id.edit",
    parentId: "routes/prints",
    path: ":id/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/3MfExplorer": {
    id: "routes/3MfExplorer",
    parentId: "root",
    path: "3MfExplorer",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/Electricity": {
    id: "routes/Electricity",
    parentId: "root",
    path: "Electricity",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/prints.new": {
    id: "routes/prints.new",
    parentId: "routes/prints",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/Filaments": {
    id: "routes/Filaments",
    parentId: "root",
    path: "Filaments",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/Invoices": {
    id: "routes/Invoices",
    parentId: "root",
    path: "Invoices",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/Printers": {
    id: "routes/Printers",
    parentId: "root",
    path: "Printers",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/Clients": {
    id: "routes/Clients",
    parentId: "root",
    path: "Clients",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route10
  },
  "routes/prints": {
    id: "routes/prints",
    parentId: "root",
    path: "prints",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
