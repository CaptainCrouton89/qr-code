"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { HexColorPicker } from "react-colorful";

export default function Home() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [showFgPicker, setShowFgPicker] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQRCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, size, fgColor, bgColor, errorLevel]);

  const generateQRCode = async () => {
    if (!canvasRef.current) return;

    try {
      if (text) {
        await QRCode.toCanvas(canvasRef.current, text, {
          width: size,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: errorLevel,
          margin: 2,
        });
      } else {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, size, size);
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, size, size);
        }
      }
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  const downloadQRCode = (format: "png" | "svg") => {
    if (!text) return;

    if (format === "png") {
      QRCode.toDataURL(
        text,
        {
          width: size * 2,
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: errorLevel,
          margin: 2,
        },
        (err, url) => {
          if (err) {
            console.error("Error generating QR code:", err);
            return;
          }
          const link = document.createElement("a");
          link.download = `qrcode-${Date.now()}.png`;
          link.href = url;
          link.click();
        }
      );
    } else {
      QRCode.toString(
        text,
        {
          type: "svg",
          width: size,
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: errorLevel,
          margin: 2,
        },
        (err, svg) => {
          if (err) {
            console.error("Error generating QR code:", err);
            return;
          }
          const blob = new Blob([svg], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `qrcode-${Date.now()}.svg`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      );
    }
  };

  const copyToClipboard = async () => {
    if (!text || !canvasRef.current) return;

    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          alert("QR code copied to clipboard!");
        }
      });
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      alert("Failed to copy to clipboard");
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "QR Code Generator",
    "description": "Generate QR codes instantly for free. Customize colors, size, and error correction. Download as PNG or SVG.",
    "url": "https://qr-code-j449q3nk5-captaincrouton89s-projects.vercel.app",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-time QR code generation",
      "Customizable colors and size",
      "Multiple export formats (PNG, SVG)",
      "Error correction level selection",
      "Copy to clipboard functionality",
      "Dark mode support",
      "Mobile responsive design"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen p-8 pb-20 sm:p-20">
        <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          QR Code Generator
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="text" className="block text-sm font-medium mb-2">
                Text or URL
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL to encode"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              <div className="text-sm text-gray-500 mt-1">
                {text.length} characters
              </div>
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium mb-2">
                Size: {size}px
              </label>
              <input
                id="size"
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium mb-2">
                  Foreground Color
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFgPicker(!showFgPicker)}
                    className="h-10 w-20 border-2 border-gray-300 dark:border-gray-600 rounded cursor-pointer hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: fgColor }}
                    aria-label="Pick foreground color"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm font-mono"
                    placeholder="#000000"
                  />
                </div>
                {showFgPicker && (
                  <div className="absolute top-full left-0 z-50 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                    <HexColorPicker color={fgColor} onChange={setFgColor} />
                    <button
                      onClick={() => setShowFgPicker(false)}
                      className="mt-3 w-full px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowBgPicker(!showBgPicker)}
                    className="h-10 w-20 border-2 border-gray-300 dark:border-gray-600 rounded cursor-pointer hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: bgColor }}
                    aria-label="Pick background color"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm font-mono"
                    placeholder="#FFFFFF"
                  />
                </div>
                {showBgPicker && (
                  <div className="absolute top-full left-0 z-50 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                    <HexColorPicker color={bgColor} onChange={setBgColor} />
                    <button
                      onClick={() => setShowBgPicker(false)}
                      className="mt-3 w-full px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="errorLevel"
                className="block text-sm font-medium mb-2"
              >
                Error Correction Level
              </label>
              <select
                id="errorLevel"
                value={errorLevel}
                onChange={(e) =>
                  setErrorLevel(e.target.value as "L" | "M" | "Q" | "H")
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <canvas
                ref={canvasRef}
                width={size}
                height={size}
                className="max-w-full h-auto"
              />
            </div>

            {text && (
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => downloadQRCode("png")}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Download PNG
                </button>
                <button
                  onClick={() => downloadQRCode("svg")}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Download SVG
                </button>
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Copy to Clipboard
                </button>
              </div>
            )}

            {!text && (
              <p className="text-gray-500 text-center">
                Enter text or URL to generate QR code
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Generate QR codes instantly for URLs, text, contact info, and more.
          </p>
          <p className="mt-2">
            Customize colors, size, and error correction level for your needs.
          </p>
        </div>
      </main>
    </div>
    </>
  );
}