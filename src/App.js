import React, { useState, useRef } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { searchPlugin } from "@react-pdf-viewer/search";
import "@react-pdf-viewer/search/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { Box, Button } from "@mui/material";
import FileInput from "./components/FileInput/FileInput";
import Input from "./components/Input/Input";
import Selected from "./components/select/selected";

const workerUrl =
  "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

const App = () => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const searchPluginInstance = searchPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage } = pageNavigationPluginInstance;
  const { highlight } = searchPluginInstance;

  const [pdfFile, setPdfFile] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCoordinate, setSelectedCoordinate] = useState('');
  const [coordinates, setCoordinates] = useState([]);
  const [stockFileData, setStockFileData] = useState({});

  const viewerRef = useRef(null);

  const handleSearch = async (e) => {
    // e.preventDefault();
    if (highlight) {
      highlight({ keyword: searchText });
    }
    if (pdfFile) {
      const coords = await findKeywordCoordinates(pdfFile, searchText);
      setCoordinates(coords);
    }
  };

  const handleClearData = () =>{
    setStockFileData({});
    setSearchText('');
    setPdfFile(null);
    setCoordinates([]);
  }

  const handleFileDregAdnDrop = (event) => {
    const file = event;
    setStockFileData(file)
    if (file) {
      if (file.type === "application/pdf") {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
        };
      } else {
        console.log("Please select only PDF.");
        setPdfFile(null);
      }
    }
  };

  const findKeywordCoordinates = async (fileUrl, keyword) => {
    const loadingTask = pdfjsLib.getDocument(fileUrl);
    const pdf = await loadingTask.promise;
    const coordinates = [];

    for (let pageIndex = 0; pageIndex < pdf.numPages; pageIndex++) {
      const page = await pdf.getPage(pageIndex + 1);
      const textContent = await page.getTextContent();
      const viewport = page.getViewport({ scale: 1.0 });

      textContent.items.forEach((textItem) => {
        const text = textItem.str;
        if (text?.includes(keyword)) {
          const transform = textItem?.transform;
          const x = transform[4];
          const y = viewport?.height - transform[5];
          coordinates.push({
            page: pageIndex + 1,
            x,
            y,
            text,
          });
        }
      });
    }
    return coordinates;
  };

  const handleCoordinateClick = (pageNumber) => {
    jumpToPage(pageNumber);
  };

  const handleChange = (e) => {
    const selectedCoord = coordinates.find(coord => coord?.page === e?.target?.value);
    setSelectedCoordinate(e?.target?.value);
    handleCoordinateClick(selectedCoord?.page - 1);
  };

  return (
    <div>
      {/* Upload PDF */}
      <Box style={{ display: "flex", gap: 5 }}>
        <Box>
          <FileInput
            label="Upload PDF"
            value={stockFileData}
            onChange={handleFileDregAdnDrop}
            clearIconButtonProps={false}
          />
        </Box>
        <Box>
          <Input
            name="Search"
            label="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Box>
        </Box>
        <Box style={{ marginTop: '20px' }}>
          <Button
            sx={{
              background: "linear-gradient(#ed018c, rgb(163 34 34) 100%)",
              color: "#fff",
              textTransform: "capitalize",
              borderRadius: "6px",
              marginRight: '10px'
            }}
            onClick={() => handleSearch()}
          >
            Search
          </Button>
          <Button
            sx={{
              background: "linear-gradient(#ed018c, rgb(163 34 34) 100%)",
              color: "#fff",
              textTransform: "capitalize",
              borderRadius: "6px",
            }}
            onClick={() => handleClearData()}
          >
            All Clear
          </Button>
        </Box>
        <Box>
          {coordinates?.length > 0 && (
            <Selected
              selectedCoordinate={selectedCoordinate}
              handleChange={handleChange}
              coordinates={coordinates}
            />
          )}
        </Box>
      {/* View PDF */}
      <h5>View PDF</h5>
      <Box
        style={{
          height: "750px",
          border: "1px solid rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        {pdfFile ? (
          <Worker workerUrl={workerUrl}>
            <Viewer
              ref={viewerRef}
              fileUrl={pdfFile}
              plugins={[
                // defaultLayoutPluginInstance,
                searchPluginInstance,
                pageNavigationPluginInstance,
              ]}
              enableSmoothScroll
            />
          </Worker>
        ) : (
          <Box>No file is selected yet</Box>
        )}
      </Box>
    </div>
  );
}

export default App;
