#version 330 core

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoords;

out VS_OUT
{
	vec3 FragPos;
	vec3 Normal;
	vec2 TexCoords;
} vs_out;

uniform bool invertedNormals;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
	vec4 viewPos = view * model * vec4(aPos, 1.0);
	mat3 normalMatrix = transpose(inverse(mat3(view * model)));

	vs_out.FragPos = viewPos.xyz;
	vs_out.Normal = normalMatrix * (invertedNormals ? -aNormal : aNormal);
	vs_out.TexCoords = aTexCoords;

	gl_Position = projection * viewPos;
}