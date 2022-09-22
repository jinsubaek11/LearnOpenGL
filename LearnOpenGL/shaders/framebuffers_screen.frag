#version 330 core

in vec2 TexCoords;

uniform sampler2D screenTexture;

out vec4 color;

const float offset = 1.0 / 300.0;

void main()
{
	vec2 offsets[9] = vec2[](
		vec2(-offset, offset),
		vec2(0.0f, offset),
		vec2(offset, offset),
		vec2(-offset, 0.0f),
		vec2(0.0f, 0.0f),
		vec2(offset, 0.0f),
		vec2(-offset, -offset),
		vec2(0.0f, -offset),
		vec2(offset, -offset)
	);

	float kernel[9] = float[](
		-1, -1, -1,
		-1,  9, -1,
		-1, -1, -1
	);

	float kernel2[9] = float[](
		1.0 / 16, 2.0 / 16, 1.0 / 16,
		2.0 / 16, 4.0 / 16, 2.0 / 16,
		1.0 / 16, 2.0 / 16, 1.0 / 16
	);

	float kernel3[9] = float[](
		1,  1,  1,
		1, -8,  1,
		1,  1,  1
	);

	vec3 sampleTex[9];
	for (int i = 0; i < 9; i++)
	{
		sampleTex[i] = vec3(texture(screenTexture, TexCoords.st + offsets[i]));
	}

	vec3 col = vec3(0.0);
	for (int i = 0; i < 9; i++)
	{
		//col += sampleTex[i] * kernel[i];
		//col += sampleTex[i] * kernel2[i];
		col += sampleTex[i] * kernel3[i];
	}

	color = vec4(col, 1.0);

	//vec3 col = 1.0 - texture(screenTexture, TexCoords).rgb;
	//vec3 col = texture(screenTexture, TexCoords).rgb;
	//float average = 0.2126 * col.r + 0.7152 * col.g + 0.0722 * col.b;
	//color = vec4(col, 1.0);
	//color = vec4(vec3(average), 1.0);
}