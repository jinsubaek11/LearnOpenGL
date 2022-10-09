#version 330 core

//layout (location = 0) in vec3 aPos;
//layout (location = 1) in vec2 aTexCoords;
//layout (location = 2) in vec3 aNormal;
//layout (location = 3) in vec3 aTangents;
//layout (location = 4) in vec3 aBiTangents;

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoords;
layout (location = 3) in vec3 aTangents;
layout (location = 4) in vec3 aBitangents;

uniform mat4 projection;
uniform mat4 view; 
uniform mat4 model;
uniform vec3 viewPos;
uniform vec3 lightPos;

out VS_OUT
{
	vec3 FragPos;
	vec2 TexCoords;
	vec3 TangentsLightPos;
	vec3 TangentsViewPos;
	vec3 TangentsFragPos;
} vs_out;

void main()
{
	vs_out.FragPos = vec3(model * vec4(aPos, 1.0));
	vs_out.TexCoords = aTexCoords;

	mat3 normalMatrix = transpose(inverse(mat3(model)));
	vec3 T = normalize(normalMatrix * aTangents);
	vec3 N = normalize(normalMatrix * aNormal);
	T = normalize(T - dot(T, N) * N);
	vec3 B = cross(T, N);

	mat3 TBN = transpose(mat3(T, B, N));
	vs_out.TangentsLightPos = TBN * lightPos;
	vs_out.TangentsViewPos = TBN * viewPos;
	vs_out.TangentsFragPos = TBN * vs_out.FragPos;

	gl_Position = projection * view * model *vec4(aPos, 1.0);
}