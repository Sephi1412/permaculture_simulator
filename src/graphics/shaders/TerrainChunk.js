export const terrain_VertexShader = /*GLSL*/ `
    precision mediump float;
    precision mediump int;

    uniform mat4 modelMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec3 cameraPosition;
    uniform float fogDensity;
    uniform vec3 cloudScale;

    // Attributes
    in vec3 position;
    in vec3 normal;
    in vec4 tangent;
    in vec3 color;
    in vec2 uv;

    // Outputs
    out vec2 vUv;
    out vec3 vPos;
    out vec3 vNormal;


    void main()	{
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        vPos = position;
        vNormal = normal;
        vUv = uv;
    }
`;

export const terrain_fragmentShader = /*GLSL*/ `
    precision mediump float;
    precision mediump int;

    uniform vec3 cursorPos;
    uniform float cursorRadius;

    uniform vec3 lightDirection;
    
    in vec3 vPos;
    in vec3 vNormal;
    in vec2 vUv;

    out vec4 out_FragColor;
    
    void main()	{
        vec4 pixelColor = vec4(0.0);    
        float Uo = float(length(vPos - cursorPos));
        vec4 color = mix(vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 1.0, 1.0, 0.75), float(cursorRadius - 0.1 < Uo &&  Uo < cursorRadius + 0.1));
    

        vec4 normalAmp = normalize(vec4(vNormal, 1.0));
        vec3 norm = normalize(vNormal);
        vec3 lightColor = vec3(1.0, 1.0, 1.0);
        vec3 ld = normalize(vPos - lightDirection);
        float nDotL = clamp(dot(-lightDirection, norm), 0.85, 1.0);

        pixelColor += color;

        vec3 diffuseColor = lightColor * nDotL * vec3(pixelColor.x, pixelColor.y, pixelColor.z);
            
        out_FragColor = vec4(diffuseColor.x, diffuseColor.y, diffuseColor.z, 1.0);
    }
`;
