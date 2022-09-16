#version 330 core

in vec3 vNormal;
in vec3 vFragPos;
in vec2 vTexCoords;

uniform vec3 lightColor;
uniform vec3 lightPos;
uniform vec3 viewPos;

struct Material
{
	sampler2D diffuse;
	sampler2D specular;
	sampler2D emission;

	float shininess;
}; 
uniform Material material;

struct Light
{
	vec3 direction;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};
uniform Light light;

out vec4 color;

void main()
{
	vec3 ambient = light.ambient * texture(material.diffuse, vTexCoords).rgb;

	vec3 lightDir = normalize(-light.direction);
	vec3 norm = normalize(vNormal);

	float diff = max(dot(lightDir, norm), 0);
	vec3 diffuse = light.diffuse * diff * texture(material.diffuse, vTexCoords).rgb;

	vec3 viewDir = normalize(viewPos - vFragPos);
	vec3 reflectDir = reflect(-lightDir, norm);
	float spec = pow(max(dot(viewDir, reflectDir), 0), material.shininess);
	vec3 specular = spec * light.specular;

	vec3 result = ambient + diffuse + specular;

	color = vec4(result, 1.0);
}
