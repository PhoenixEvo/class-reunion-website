"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, MessageCircle, Heart } from "lucide-react";

interface LandingPageProps {
  onNavigate: (section: "landing" | "gallery" | "qa") => void;
}

interface VisibleName {
  id: string;
  name: string;
  x: number;
  y: number;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  /* =======================
     1. DANH SÁCH TÊN
  ======================= */
  const classNames = [
    "Bùi Ngọc Phương Lan",
    "Cấn Quỳnh Anh",
    "Dương Bảo Khang",
    "Dương Quốc Nhựt",
    "Dương Tấn Đạt",
    "Đặng Nguyễn Anh Thư",
    "Đinh Gia Hân",
    "Đỗ Ngọc Bích Châu",
    "Lê Minh Huy",
    "Lê Nguyễn Đại Phú",
    "Lê Nguyễn Yến Nhi",
    "Lê Thành Khải",
    "Lê Thị Cẩm Nguyên",
    "Lê Thị Ngọc Giàu",
    "Lê Tuyết Thảo",
    "Lê Võ Hải Vy",
    "Ngô Anh Tuấn",
    "Nguyễn Bá Thân Tâm",
    "Nguyễn Bùi Mạnh Đạt",
    "Nguyễn Duy Phượng Hồng",
    "Nguyễn Hoàng Giang",
    "Nguyễn Hồng Anh",
    "Nguyễn Hữu Thịnh",
    "Nguyễn Lê Hoàng Minh",
    "Nguyễn Lê Quỳnh Như",
    "Nguyễn Minh Triết",
    "Nguyễn Ngọc Như Ý",
    "Nguyễn Ngọc Trinh",
    "Nguyễn Nhật Phát",
    "Nguyễn Phạm Thiên Hào",
    "Nguyễn Tấn Trọng",
    "Nguyễn Thị Kim Chi",
    "Nguyễn Trường Duy",
    "Nguyễn Vinh Hoàng Ngân",
    "Nguyễn Yến Quỳnh",
    "Phan Thị Thanh Ngân",
    "Phùng Nguyễn Ngọc Ánh",
    "Tô Quốc Tính",
    "Trần Anh Thư",
    "Trần Hồng Phúc",
    "Trần Thị Bích Ngọc",
    "Trình Văn Lưu",
    "Trịnh Yến Vy",
    "Trương Ngọc Bảo Châu",
    "Võ Bình Thiên Châu",
    "Võ Nguyễn Thuý Vy",
    "Võ Trần Ngọc Trâm",
  ];

  /* =======================
     2. GRID PHÂN BỐ ĐỀU
  ======================= */
  const COLS = 5;
  const ROWS = 4;
  const PADDING = 10; // % border an toàn
  const BATCH_SIZE = 12;

  const cellW = (100 - PADDING * 2) / COLS;
  const cellH = (100 - PADDING * 2) / ROWS;

  const gridCells = useMemo(() => {
    const cells: { r: number; c: number }[] = []
  
    const centerR = (ROWS - 1) / 2
    const centerC = (COLS - 1) / 2
    const radius = 1.2 // điều chỉnh độ rộng vùng né center
  
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const dist = Math.sqrt(
          Math.pow(r - centerR, 2) + Math.pow(c - centerC, 2)
        )
  
        // nếu muốn né center: chỉ push cell nào cách tâm > radius
        if (dist > radius) {
          cells.push({ r, c })
        }
      }
    }
  
    return cells
  }, []);

  const shuffledNames = useMemo(
    () => [...classNames].sort(() => Math.random() - 0.5),
    []
  );

  const [visibleNames, setVisibleNames] = useState<VisibleName[]>([]);
  const [cursor, setCursor] = useState(0);

  /* =======================
     3. SINH LIÊN TỤC (MƯỢT)
  ======================= */
  useEffect(() => {
    const makeBatch = (startIndex: number): VisibleName[] => {
      const batch: VisibleName[] = [];

      for (let i = 0; i < BATCH_SIZE; i++) {
        const idxName = (startIndex + i) % shuffledNames.length;
        const idxCell = (startIndex + i) % gridCells.length;

        const name = shuffledNames[idxName];
        const cell = gridCells[idxCell];

        const x =
          PADDING + cell.c * cellW + cellW * (0.2 + Math.random() * 0.6);
        const y =
          PADDING + cell.r * cellH + cellH * (0.2 + Math.random() * 0.6);

        batch.push({
          id: `${idxName}-${idxCell}`, // key ổn định
          name,
          x,
          y,
        });
      }

      return batch;
    };

    // batch đầu tiên
    setVisibleNames(makeBatch(0));

    const timer = setInterval(() => {
      setCursor((prevCursor) => {
        const nextCursor = (prevCursor + BATCH_SIZE) % shuffledNames.length;
        setVisibleNames(makeBatch(nextCursor));
        return nextCursor;
      });
    }, 2500); // gần với duration 2.2s

    return () => clearInterval(timer);
  }, [shuffledNames, gridCells, cellW, cellH]);

  /* =======================
     4. RENDER
  ======================= */
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* BACKGROUND NAMES */}
      <AnimatePresence>
        {visibleNames.map((item) => (
          <motion.div
            key={item.id}
            className="
        absolute pointer-events-none select-none
        text-xs sm:text-sm md:text-base
        text-nostalgic-brown/50
        font-normal whitespace-nowrap
      "
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              willChange: "opacity",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          >
            {item.name}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-serif text-nostalgic-brown mb-4">
          Họp Lớp
        </h1>

        <p className="text-lg md:text-xl text-nostalgic-sage mb-6">
          Kỷ niệm chung của chúng ta
        </p>

        <p className="text-base text-nostalgic-brown/80 mb-10 leading-relaxed">
          Website này không chỉ để xem, mà để nhớ rằng chúng ta đã từng là một
          lớp. Hãy cùng nhau ôn lại những kỷ niệm đẹp và chia sẻ những câu hỏi
          thầm kín. <br />
          Designed by <br />
          <a href="https://www.facebook.com/nhatphst1203/" target="_blank" className="text-nostalgic-warm hover:text-nostalgic-warm/80 transition-colors">
            <span className="underline">LopTruong3Doi</span>
          </a>
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button
            onClick={() => onNavigate("gallery")}
            className="nostalgic-button flex items-center gap-2"
          >
            <Camera size={18} />
            Xem hình ảnh kỷ niệm
          </button>

          <button
            onClick={() => onNavigate("qa")}
            className="nostalgic-button bg-nostalgic-sage flex items-center gap-2"
          >
            <MessageCircle size={18} />
            Hỏi điều bạn từng thắc mắc
          </button>
        </div>

        <div className="mt-14 flex justify-center">
          <Heart className="text-nostalgic-warm/30 w-7 h-7 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
