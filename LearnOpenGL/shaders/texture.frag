#version 330 core

in vec2 vTexCoords;

uniform sampler2D tex1;
uniform sampler2D tex2;

out vec4 color;

void main()
{
	//color = texture(tex1, vTexCoords);
	color = mix(texture(tex1, vTexCoords), texture(tex2, vTexCoords), 0.2);
	//color = texture(tex1, vTexCoords) * texture(tex2, vTexCoords);
}