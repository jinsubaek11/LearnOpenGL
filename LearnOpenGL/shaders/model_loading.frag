#version 330 core

out vec4 FragColor;

in vec2 vTexCoords;

//uniform sampler2D texture_diffuse1;
//uniform samplerCube cubeTexture;

void main()
{
	//FragColor = texture(texture_diffuse1, vTexCoords);
	FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}