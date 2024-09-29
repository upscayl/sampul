/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Camera, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Component() {
  const [width, setWidth] = useState(() => {
    if (typeof localStorage === "undefined") return 500;
    return Number(localStorage.getItem("width")) || 500;
  });
  const [height, setHeight] = useState(() => {
    if (typeof localStorage === "undefined") return 500;
    return Number(localStorage.getItem("height")) || 500;
  });
  const [count, setCount] = useState(() => {
    if (typeof localStorage === "undefined") return 500;
    return Number(localStorage.getItem("count")) || 5;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const [downloaded, setDownloaded] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("width")) {
      setWidth(Number(localStorage.getItem("width")));
    }
    if (localStorage.getItem("height")) {
      setHeight(Number(localStorage.getItem("height")));
    }
    if (localStorage.getItem("count")) {
      setCount(Number(localStorage.getItem("count")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("width", width.toString());
  }, [width]);

  useEffect(() => {
    localStorage.setItem("height", height.toString());
  }, [height]);

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  const handleDownload = async () => {
    setIsLoading(true);
    const zip = new JSZip();

    try {
      for (let i = 0; i < count; i++) {
        const response = await fetch(
          `https://picsum.photos/${width}/${height}`
        );
        const blob = await response.blob();
        if (blob) {
          setDownloaded(i + 1);
        }
        zip.file(`image_${i + 1}.jpg`, blob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "sampul_images.zip");
    } catch (error) {
      console.error("Error downloading images:", error);
      alert("An error occurred while downloading images. Please try again.");
    } finally {
      setIsLoading(false);
      setDownloaded(0);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-screen h-screen blur-sm fixed top-0 left-0">
        <img
          src="https://picsum.photos/1920/1080"
          alt="Background"
          className={cn(
            "object-cover w-full h-full opacity-0 transition-opacity duration-500 ease-in-out scale-105",
            imageIsLoaded && "opacity-100"
          )}
          onLoad={() => setImageIsLoaded(true)}
        />
      </div>

      <Card
        className={cn(
          "w-[350px] backdrop-blur-lg bg-black/70 mix-blend-hard-light transition-opacity duration-1000 ease-in-out opacity-0 border-none",
          imageIsLoaded && "opacity-100"
        )}>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Camera size={32} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-center text-4xl text-white font-bold">
            Sampul
          </CardTitle>
          <CardDescription className="text-center text-white/70">
            Custom Resolution Image Samples
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="width" className="text-white/50">
                Width (px)
              </Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min={1}
                className="bg-white/20 border-none text-white font-bold"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="height" className="text-white/50">
                Height (px)
              </Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                min={1}
                className="bg-white/20 border-none text-white font-bold"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="count" className="text-white/50">
                Number of Images (1-50)
              </Label>
              <Input
                id="count"
                type="number"
                value={count}
                onChange={(e) =>
                  setCount(Math.min(50, Math.max(1, Number(e.target.value))))
                }
                min={1}
                max={50}
                className="bg-white/20 border-none text-white font-bold"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <Button
            onClick={handleDownload}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white">
            {isLoading
              ? `Downloading (${downloaded}/${count})...`
              : "Download Images"}
            <Download className="ml-2 h-4 w-4" />
          </Button>

          <p className="p-1 rounded-md text-white/50 mt-4 text-sm text-center">
            Made with ⌨️ 🖱️ by <a href="https://upscayl.org">Upscayl</a>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
