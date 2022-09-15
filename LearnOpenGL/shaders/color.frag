#version 330 core

in vec3 vNormal;
in vec3 vFragPos;

uniform vec3 lightColor;
uniform vec3 lightPos;
uniform vec3 viewPos;

struct Material
{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
}; 
uniform Material material;

struct Light
{
	vec3 position;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};
uniform Light light;

out vec4 color;


void main()
{
	vec3 ambient = light.ambient * material.ambient;

	vec3 norm = normalize(vNormal);
	vec3 lightDir = normalize(light.position - vFragPos);
	float diff = max(dot(norm, lightDir), 0);
	vec3 diffuse = light.diffuse * (diff * material.diffuse);

	float specularStrength = 0.5;
	vec3 viewDir = normalize(viewPos - vFragPos);
	vec3 reflectDir = reflect(-lightDir, norm);
	float spec = pow(max(dot(viewDir, reflectDir), 0), material.shininess);
	vec3 specular = light.specular * (spec * material.specular);

	vec3 result = ambient + diffuse + specular;

	color = vec4(result, 1.0);
}