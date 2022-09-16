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
	float shininess;
	sampler2D emission;
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
	vec3 ambient = light.ambient * texture(material.diffuse, vTexCoords).rgb;

	vec3 norm = normalize(vNormal);
	vec3 lightDir = normalize(light.position - vFragPos);
	float diff = max(dot(norm, lightDir), 0);
	vec3 diffuse = light.diffuse * diff * texture(material.diffuse, vTexCoords).rgb;

	float specularStrength = 0.5;
	vec3 viewDir = normalize(viewPos - vFragPos);
	vec3 reflectDir = reflect(-lightDir, norm);
	float spec = pow(max(dot(viewDir, reflectDir), 0), material.shininess);
	vec3 specular = light.specular * spec * texture(material.specular, vTexCoords).rgb;

	vec3 emission = texture(material.emission, vTexCoords).rgb;

	if (texture(material.specular, vTexCoords).r != 0.0)
	{
		emission.rgb = vec3(0.0);
	};

	vec3 result = ambient + diffuse + specular + emission;

	color = vec4(result, 1.0);
}