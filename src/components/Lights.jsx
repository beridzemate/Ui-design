import { Environment, Lightformer } from "@react-three/drei";

const Lights = () => {
  // Common light configurations
  const lightformerConfig = {
    form: "rect",
    intensity: 10,
    scale: 10,
  };

  const spotLightConfig = {
    angle: 0.15,
    penumbra: 1,
    decay: 0,
    intensity: Math.PI * 0.2,
    color: "#f8f9fa",
  };

  return (
    <group name="lights">
      {/**
       * Environment setup for the scene
       */}
      <Environment resolution={256}>
        <group>
          {/**
           * Lightformers for ambient and directional lighting
           */}
          <Lightformer
            {...lightformerConfig}
            position={[-1, 0, -10]}
            color="#495057"
          />
          <Lightformer
            {...lightformerConfig}
            position={[-10, 2, 1]}
            rotation-y={Math.PI / 2}
          />
          <Lightformer
            {...lightformerConfig}
            position={[10, 0, 1]}
            rotation-y={Math.PI / 2}
          />
        </group>
      </Environment>

      {/**
       * Spotlights for focused lighting
       */}
      <spotLight
        {...spotLightConfig}
        position={[-2, 10, 5]}
      />
      <spotLight
        {...spotLightConfig}
        position={[0, -25, 10]}
      />
      <spotLight
        {...spotLightConfig}
        position={[0, 15, 5]}
        intensity={Math.PI * 3} // Override intensity for this light
        decay={0.1} // Override decay for this light
      />
    </group>
  );
};

export default Lights;