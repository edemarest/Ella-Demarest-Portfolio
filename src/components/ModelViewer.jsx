import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelViewer = ({ modelPath, cameraConfig }) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    if (!modelPath) {
      console.error("❌ modelPath is undefined or empty!");
      return;
    }

    console.log("🔍 Loading model from:", modelPath);

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        console.log("✅ Model loaded successfully!");
        setModel(gltf.scene);
      },
      undefined,
      (error) => console.error("❌ Error loading model:", error)
    );
  }, [modelPath]);

  return (
    <Canvas
      style={{
        width: "100%",
        height: "350px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        overflow: "hidden",
        background: "rgba(0, 0, 0, 0.6)", // ✅ Base layer (60% black)
        // ✅ Grid image overlay with 50% opacity
        backgroundImage: `
          url("https://www.freeiconspng.com/thumbs/grid-png/grid-png-image-0.png")
        `,
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      camera={{
        position: cameraConfig?.position || [0, 4, 10], // ✅ Uses per-model camera position
        fov: cameraConfig?.fov || 65 // ✅ Uses per-model FOV
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[3, 3, 3]} />

      <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="gray" /></mesh>}>
        {model ? <primitive object={model} scale={1.2} position={[0, -1, 0]} /> : null}
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
