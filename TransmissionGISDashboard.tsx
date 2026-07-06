import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  BatteryCharging,
  Gauge,
  Layers,
  MapPin,
  Minus,
  PlugZap,
  RadioTower,
  Server,
  ShieldCheck,
  SunMedium,
  TrendingUp,
  Waves,
  Wind,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

type Voltage = "400kV" | "220kV" | "132kV";

type GridNode = {
  id: string;
  name: string;
  x: number;
  y: number;
  voltage: Voltage;
  type: "grid" | "renewable" | "load";
};

type Corridor = {
  id: string;
  from: GridNode;
  to: GridNode;
  voltage: Voltage;
  load: number;
};

const voltageStyles: Record<Voltage, { stroke: string; width: number; glow: string }> = {
  "400kV": { stroke: "#1d4ed8", width: 2.7, glow: "rgba(29,78,216,0.22)" },
  "220kV": { stroke: "#059669", width: 1.85, glow: "rgba(5,150,105,0.2)" },
  "132kV": { stroke: "#f59e0b", width: 1.25, glow: "rgba(245,158,11,0.18)" },
};

const cities = [
  { name: "Visakhapatnam", x: 704, y: 126 },
  { name: "Vizianagaram", x: 668, y: 100 },
  { name: "Srikakulam", x: 716, y: 64 },
  { name: "Rajahmundry", x: 590, y: 210 },
  { name: "Kakinada", x: 638, y: 218 },
  { name: "Vijayawada", x: 500, y: 332 },
  { name: "Guntur", x: 464, y: 360 },
  { name: "Ongole", x: 410, y: 450 },
  { name: "Nellore", x: 372, y: 562 },
  { name: "Tirupati", x: 268, y: 652 },
  { name: "Kadapa", x: 270, y: 514 },
  { name: "Kurnool", x: 176, y: 430 },
  { name: "Anantapur", x: 124, y: 560 },
  { name: "Nandyal", x: 244, y: 428 },
  { name: "Eluru", x: 530, y: 286 },
  { name: "Machilipatnam", x: 542, y: 392 },
];

const districtBoundaries = [
  "M690 52 L660 92 L642 138 L612 186 L580 230 L548 270 L514 324",
  "M616 76 L590 128 L548 176 L516 220 L492 286 L458 356 L424 420",
  "M544 122 L510 164 L472 218 L442 286 L398 342 L360 404 L316 476",
  "M456 188 L428 250 L396 318 L352 384 L306 440 L264 512 L232 606",
  "M362 260 L330 330 L292 386 L238 430 L184 474 L136 540 L104 616",
  "M246 286 L216 346 L174 386 L140 442 L108 506 L78 574",
  "M505 330 L548 374 L588 430 L612 486",
  "M432 438 L476 484 L524 526",
  "M318 514 L372 560 L430 604",
  "M178 432 L236 470 L296 510",
  "M126 556 L190 596 L264 644",
  "M548 270 L594 310 L636 366",
  "M590 210 L632 260 L668 314",
  "M642 138 L686 178 L724 224",
];

const nodes: GridNode[] = [
  { id: "srikakulam", name: "Srikakulam 220", x: 718, y: 66, voltage: "220kV", type: "grid" },
  { id: "vizianagaram", name: "Vizianagaram 400", x: 666, y: 102, voltage: "400kV", type: "grid" },
  { id: "simhachalam", name: "Simhachalam 400", x: 704, y: 134, voltage: "400kV", type: "grid" },
  { id: "parawada", name: "Parawada Pooling", x: 730, y: 160, voltage: "220kV", type: "grid" },
  { id: "kakinada", name: "Kakinada 220", x: 636, y: 222, voltage: "220kV", type: "grid" },
  { id: "vemagiri", name: "Vemagiri 400", x: 590, y: 218, voltage: "400kV", type: "grid" },
  { id: "eluru", name: "Eluru 220", x: 530, y: 286, voltage: "220kV", type: "grid" },
  { id: "ibrahimpatnam", name: "Ibrahimpatnam 400", x: 506, y: 334, voltage: "400kV", type: "grid" },
  { id: "guntur", name: "Guntur 220", x: 462, y: 362, voltage: "220kV", type: "grid" },
  { id: "chilakaluripet", name: "Chilakaluripet 400", x: 424, y: 404, voltage: "400kV", type: "grid" },
  { id: "ongole", name: "Ongole 220", x: 408, y: 452, voltage: "220kV", type: "grid" },
  { id: "nellore", name: "Nellore 400", x: 374, y: 564, voltage: "400kV", type: "grid" },
  { id: "tada", name: "Tada 220", x: 386, y: 622, voltage: "220kV", type: "grid" },
  { id: "tirupati", name: "Tirupati 400", x: 268, y: 654, voltage: "400kV", type: "grid" },
  { id: "kadapa", name: "Kadapa 400", x: 270, y: 516, voltage: "400kV", type: "grid" },
  { id: "rayachoty", name: "Rayachoty 220", x: 236, y: 584, voltage: "220kV", type: "grid" },
  { id: "kurnool", name: "Kurnool 400", x: 178, y: 432, voltage: "400kV", type: "grid" },
  { id: "nandyal", name: "Nandyal 220", x: 244, y: 430, voltage: "220kV", type: "grid" },
  { id: "ananthapur", name: "Anantapur 400", x: 126, y: 560, voltage: "400kV", type: "grid" },
  { id: "hindupur", name: "Hindupur 220", x: 118, y: 646, voltage: "220kV", type: "grid" },
  { id: "machilipatnam", name: "Machilipatnam 132", x: 542, y: 392, voltage: "132kV", type: "load" },
  { id: "amalapuram", name: "Amalapuram 132", x: 610, y: 282, voltage: "132kV", type: "load" },
  { id: "hindupurSolar", name: "Hindupur Solar Park", x: 96, y: 612, voltage: "220kV", type: "renewable" },
  { id: "kadapaSolar", name: "Kadapa Solar Pool", x: 304, y: 548, voltage: "220kV", type: "renewable" },
  { id: "kurnoolSolar", name: "Kurnool Ultra Mega Solar", x: 144, y: 474, voltage: "400kV", type: "renewable" },
  { id: "nandyalWind", name: "Nandyal Wind Pool", x: 212, y: 388, voltage: "220kV", type: "renewable" },
  { id: "coastalWind", name: "Coastal Wind Pool", x: 618, y: 362, voltage: "220kV", type: "renewable" },
  { id: "sileruHydro", name: "Upper Sileru Hydro", x: 640, y: 152, voltage: "220kV", type: "renewable" },
];

const getNode = (id: string) => nodes.find((node) => node.id === id)!;

const primaryLinks: Array<[string, string, Voltage, number]> = [
  ["srikakulam", "vizianagaram", "220kV", 62],
  ["vizianagaram", "simhachalam", "400kV", 81],
  ["simhachalam", "vemagiri", "400kV", 77],
  ["vemagiri", "ibrahimpatnam", "400kV", 74],
  ["ibrahimpatnam", "chilakaluripet", "400kV", 72],
  ["chilakaluripet", "nellore", "400kV", 69],
  ["nellore", "tirupati", "400kV", 66],
  ["tirupati", "ananthapur", "400kV", 71],
  ["ananthapur", "kurnool", "400kV", 76],
  ["kurnool", "kadapa", "400kV", 70],
  ["kadapa", "tirupati", "400kV", 68],
  ["vemagiri", "kakinada", "220kV", 58],
  ["kakinada", "parawada", "220kV", 55],
  ["eluru", "ibrahimpatnam", "220kV", 63],
  ["guntur", "ongole", "220kV", 54],
  ["nandyal", "kadapa", "220kV", 51],
  ["hindupurSolar", "ananthapur", "220kV", 49],
  ["kurnoolSolar", "kurnool", "400kV", 84],
  ["kadapaSolar", "kadapa", "220kV", 57],
  ["coastalWind", "machilipatnam", "220kV", 44],
  ["sileruHydro", "simhachalam", "220kV", 61],
];

const kpiCards = [
  { title: "Grid Health", value: "98.7%", description: "Stable transmission envelope", icon: ShieldCheck, tone: "text-emerald-600" },
  { title: "Transmission Capacity", value: "42.6 GW", description: "Installed transfer capability", icon: Zap, tone: "text-blue-700" },
  { title: "Transmission Lines", value: "34,912 ckm", description: "400/220/132kV network", icon: Waves, tone: "text-sky-700" },
  { title: "Substations", value: "428", description: "EHV and switching stations", icon: Server, tone: "text-indigo-700" },
  { title: "Renewable Integration", value: "11.8 GW", description: "Solar, wind and hydro pooling", icon: SunMedium, tone: "text-emerald-600" },
  { title: "Network Availability", value: "99.42%", description: "Rolling monthly availability", icon: Activity, tone: "text-green-700" },
  { title: "System Frequency", value: "49.98 Hz", description: "Southern regional grid", icon: Gauge, tone: "text-blue-700" },
  { title: "Live Status", value: "Normal", description: "No major grid constraint", icon: AlertCircle, tone: "text-emerald-600" },
];

const voltageCards = [
  { title: "400kV Backbone", value: "8,420 ckm", description: "State trunk corridors and pooling stations", icon: RadioTower, color: "bg-blue-600" },
  { title: "220kV Network", value: "13,760 ckm", description: "Regional evacuation and city ring supply", icon: PlugZap, color: "bg-emerald-600" },
  { title: "132kV Distribution", value: "12,732 ckm", description: "EHV distribution interface corridors", icon: Layers, color: "bg-amber-500" },
];

const statistics = [
  { label: "Today's Load", value: "12,840 MW" },
  { label: "Peak Load", value: "15,920 MW" },
  { label: "Power Imports", value: "1,280 MW" },
  { label: "Power Exports", value: "740 MW" },
  { label: "Solar", value: "5,960 MW" },
  { label: "Wind", value: "4,170 MW" },
  { label: "Hydro", value: "1,620 MW" },
  { label: "Thermal", value: "10,880 MW" },
];

const buildCorridors = (): Corridor[] => {
  const corridors = primaryLinks.map(([from, to, voltage, load], index) => ({
    id: `primary-${index}`,
    from: getNode(from),
    to: getNode(to),
    voltage,
    load,
  }));

  nodes.forEach((from, fromIndex) => {
    nodes.forEach((to, toIndex) => {
      if (toIndex <= fromIndex) return;

      const distance = Math.hypot(from.x - to.x, from.y - to.y);
      const sameRegion = distance < 185;
      const latticeHit = (fromIndex * 11 + toIndex * 7) % 9 === 0;
      const closeHit = distance < 112 && (fromIndex + toIndex) % 3 !== 1;

      if (sameRegion && (latticeHit || closeHit)) {
        const voltage: Voltage =
          from.voltage === "400kV" && to.voltage === "400kV"
            ? "400kV"
            : distance < 92
              ? "132kV"
              : "220kV";

        corridors.push({
          id: `mesh-${from.id}-${to.id}`,
          from,
          to,
          voltage,
          load: 35 + ((fromIndex * 13 + toIndex * 17) % 55),
        });
      }
    });
  });

  const feederNodes = nodes.filter((node) => node.type !== "renewable");
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 14; col += 1) {
      const x = 106 + col * 45 + ((row * 13 + col * 5) % 19);
      const y = 92 + row * 62 + ((row * 7 + col * 11) % 23);
      const nearest = feederNodes.reduce((best, node) => {
        const bestDistance = Math.hypot(best.x - x, best.y - y);
        const distance = Math.hypot(node.x - x, node.y - y);
        return distance < bestDistance ? node : best;
      }, feederNodes[0]);

      if (Math.hypot(nearest.x - x, nearest.y - y) < 132) {
        corridors.push({
          id: `feeder-${row}-${col}`,
          from: nearest,
          to: {
            id: `load-${row}-${col}`,
            name: `132kV Load Bay ${row + 1}-${col + 1}`,
            x,
            y,
            voltage: "132kV",
            type: "load",
          },
          voltage: "132kV",
          load: 18 + ((row * 19 + col * 23) % 46),
        });
      }
    }
  }

  return corridors;
};

const TransmissionMap = () => {
  const [zoom, setZoom] = useState(1);
  const [selectedVoltage, setSelectedVoltage] = useState<Voltage | "All">("All");
  const [hoveredNode, setHoveredNode] = useState<GridNode | null>(null);
  const corridors = useMemo(buildCorridors, []);

  const visibleCorridors = selectedVoltage === "All" ? corridors : corridors.filter((line) => line.voltage === selectedVoltage);

  return (
    <div className="relative h-[620px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:h-[720px]">
      <div className="absolute left-4 top-4 z-20 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-sm">
        {(["All", "400kV", "220kV", "132kV"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSelectedVoltage(item)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              selectedVoltage === item ? "bg-blue-700 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="absolute right-4 top-4 z-20 flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <button type="button" onClick={() => setZoom((value) => Math.min(value + 0.1, 1.35))} className="p-2 text-slate-700 hover:bg-slate-100">
          <ZoomIn className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => setZoom((value) => Math.max(value - 0.1, 0.9))} className="border-t border-slate-200 p-2 text-slate-700 hover:bg-slate-100">
          <ZoomOut className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => setZoom(1)} className="border-t border-slate-200 p-2 text-slate-700 hover:bg-slate-100">
          <Minus className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-20 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-sm">
        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Transmission Legend</div>
        <div className="grid gap-2 text-xs text-slate-700">
          {(["400kV", "220kV", "132kV"] as Voltage[]).map((voltage) => (
            <div key={voltage} className="flex items-center gap-2">
              <span className="h-1.5 w-9 rounded-full" style={{ backgroundColor: voltageStyles[voltage].stroke }} />
              <span className="font-semibold">{voltage}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-emerald-600 bg-emerald-100" />
            <span>Renewable pooling station</span>
          </div>
        </div>
      </div>

      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-4 bottom-4 z-20 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-blue-700" />
            <div>
              <div className="text-sm font-bold text-slate-900">{hoveredNode.name}</div>
              <div className="mt-1 text-xs text-slate-500">{hoveredNode.voltage} node - {hoveredNode.type === "renewable" ? "Renewable integration" : "EHV transmission"}</div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.svg
        viewBox="0 0 820 760"
        className="h-full w-full"
        animate={{ scale: zoom }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        role="img"
        aria-label="APTRANSCO Andhra Pradesh transmission GIS map"
      >
        <defs>
          <pattern id="gis-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="#e2e8f0" strokeWidth="0.55" />
          </pattern>
          <filter id="soft-line-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="820" height="760" fill="#f8fafc" />
        <rect width="820" height="760" fill="url(#gis-grid)" opacity="0.55" />
        <path
          d="M706 38 C742 66 760 104 748 142 C738 174 760 208 724 236 C690 262 684 302 646 326 C615 346 621 386 590 410 C554 438 558 481 526 512 C488 548 461 594 426 618 C388 643 363 674 320 690 C280 706 236 704 208 682 C182 660 164 620 130 616 C90 610 68 586 72 548 C77 508 104 482 104 444 C104 404 144 382 150 342 C158 294 195 272 216 238 C240 198 276 174 318 158 C358 142 380 110 416 94 C458 76 502 84 540 68 C594 45 650 14 706 38 Z"
          fill="#eef7ff"
          stroke="#2563eb"
          strokeWidth="2.6"
        />
        <path
          d="M706 38 C742 66 760 104 748 142 C738 174 760 208 724 236 C690 262 684 302 646 326 C615 346 621 386 590 410 C554 438 558 481 526 512 C488 548 461 594 426 618 C388 643 363 674 320 690 C280 706 236 704 208 682 C182 660 164 620 130 616 C90 610 68 586 72 548 C77 508 104 482 104 444 C104 404 144 382 150 342 C158 294 195 272 216 238 C240 198 276 174 318 158 C358 142 380 110 416 94 C458 76 502 84 540 68 C594 45 650 14 706 38 Z"
          fill="none"
          stroke="#1e40af"
          strokeWidth="5"
          opacity="0.08"
        />

        {districtBoundaries.map((path, index) => (
          <path key={index} d={path} fill="none" stroke="#94a3b8" strokeDasharray="6 5" strokeWidth="1.15" opacity="0.74" />
        ))}

        {visibleCorridors.map((line) => {
          const style = voltageStyles[line.voltage];
          const midX = (line.from.x + line.to.x) / 2;
          const midY = (line.from.y + line.to.y) / 2;
          const bend = ((line.from.x + line.to.y) % 19) - 9;

          return (
            <motion.path
              key={line.id}
              d={`M${line.from.x} ${line.from.y} Q${midX + bend} ${midY - bend} ${line.to.x} ${line.to.y}`}
              fill="none"
              stroke={style.stroke}
              strokeWidth={style.width}
              strokeLinecap="round"
              opacity={line.voltage === "132kV" ? 0.38 : 0.66}
              filter={line.voltage === "400kV" ? "url(#soft-line-glow)" : undefined}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.04 }}
              whileHover={{ opacity: 1, strokeWidth: style.width + 1.4 }}
            />
          );
        })}

        {cities.map((city) => (
          <g key={city.name}>
            <circle cx={city.x} cy={city.y} r="2.6" fill="#334155" />
            <text x={city.x + 7} y={city.y - 6} fill="#475569" fontSize="10.5" fontWeight="700">
              {city.name}
            </text>
          </g>
        ))}

        {nodes.map((node) => {
          const isRenewable = node.type === "renewable";
          const color = isRenewable ? "#059669" : voltageStyles[node.voltage].stroke;
          const radius = node.voltage === "400kV" ? 7.2 : node.voltage === "220kV" ? 5.8 : 4.6;

          return (
            <motion.g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              whileHover={{ scale: 1.4 }}
              style={{ cursor: "pointer", transformOrigin: `${node.x}px ${node.y}px` }}
            >
              <circle cx={node.x} cy={node.y} r={radius + 5} fill={color} opacity="0.12" />
              <circle cx={node.x} cy={node.y} r={radius} fill="#ffffff" stroke={color} strokeWidth="3" />
              <circle cx={node.x} cy={node.y} r={radius / 2.35} fill={color} />
              {isRenewable && (
                <path d={`M${node.x - 8} ${node.y + 11} L${node.x + 8} ${node.y + 11} L${node.x} ${node.y - 5} Z`} fill="#dcfce7" stroke="#059669" strokeWidth="1.2" />
              )}
            </motion.g>
          );
        })}

        <text x="94" y="742" fill="#1e3a8a" fontSize="13" fontWeight="800">
          APTRANSCO GIS - Andhra Pradesh EHV Transmission Network
        </text>
      </motion.svg>
    </div>
  );
};

type KpiCardProps = {
  item: (typeof kpiCards)[number];
  index: number;
};

const KpiCard: React.FC<KpiCardProps> = ({ item, index }) => {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -3 }}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{item.value}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
          <Icon className={`h-5 w-5 ${item.tone}`} />
        </div>
      </div>
      <p className="mt-3 text-sm leading-5 text-slate-600">{item.description}</p>
    </motion.div>
  );
};

const TransmissionGISDashboard = () => {
  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 font-sans text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.header initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-5 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue-700">
                <span>Government of Andhra Pradesh</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>APTRANSCO</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>Transmission GIS Portal</span>
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Andhra Pradesh Transmission GIS Dashboard</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
                Live grid normal
              </span>
              <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">Updated 10:45 IST</span>
            </div>
          </div>
        </motion.header>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,7fr)_minmax(320px,3fr)]">
          <TransmissionMap />
          <aside className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {kpiCards.map((item, index) => (
              <KpiCard key={item.title} item={item} index={index} />
            ))}
          </aside>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {voltageCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-xl p-3 text-white ${card.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-950">{card.title}</h2>
                    <p className="mt-1 text-3xl font-bold text-slate-950">{card.value}</p>
                    <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-slate-950">Transmission Statistics</h2>
            <TrendingUp className="h-5 w-5 text-blue-700" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
            {statistics.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
                <p className="mt-2 text-lg font-bold text-slate-950">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <BatteryCharging className="h-4 w-4 text-emerald-600" />
              Renewable dispatch
            </div>
            <p className="mt-2">Solar and wind pooling corridors are operating within declared transfer margins.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Activity className="h-4 w-4 text-blue-700" />
              Contingency margin
            </div>
            <p className="mt-2">N-1 loading is healthy across principal 400kV and 220kV corridors.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Wind className="h-4 w-4 text-emerald-600" />
              Coastal evacuation
            </div>
            <p className="mt-2">Coastal wind and hydro injections are synchronized with regional demand pockets.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransmissionGISDashboard;
