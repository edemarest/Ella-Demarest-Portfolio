import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
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
        background: "rgba(0, 0, 0, 0.6)",
        backgroundImage: `url("https://www.freeiconspng.com/thumbs/grid-png/grid-png-image-0.png")`,
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      camera={{
        position: cameraConfig?.position || [0, 4, 10], 
        fov: cameraConfig?.fov || 65
      }}
    >
      {/* 💡 Improved Lighting Setup */}
      <ambientLight intensity={2.5} /> {/* Increased brightness */}
      
      {/* Add multiple directional lights for better shading */}
      <directionalLight position={[5, 5, 5]} intensity={2.5} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <directionalLight position={[5, -3, 5]} intensity={1.2} />

      {/* SpotLight to create realistic highlights */}
      <spotLight position={[0, 10, 5]} intensity={3} angle={0.3} penumbra={1} castShadow />

      {/* PointLight to add global illumination */}
      <pointLight position={[2, 3, 2]} intensity={1.5} />

      {/* ✅ Environment for realistic reflections */}
      <Environment preset="sunset" background={false} />

      <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="gray" /></mesh>}>
        {model ? <primitive object={model} scale={1.2} position={[0, -1, 0]} /> : null}
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
