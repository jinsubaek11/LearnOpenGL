#version 330 core

in vec3 vFragPos;
in vec3 vNormal;
in vec2 vTexCoords;
out vec4 FragColor;

struct Material
{	
	sampler2D diffuse;
	sampler2D specular;

	float shininess;
};
uniform Material material;

struct DirLight
{
	vec3 direction;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};
uniform DirLight dirLight;

struct PointLight
{
	vec3 position;

	float constant;
	float linear;
	float quadratic;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};
#define NR_POINT_LIGHTS 4
uniform PointLight pointLights[NR_POINT_LIGHTS];

struct SpotLight
{
	vec3 direction;
	vec3 position;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;

	float constant;
	float linear;
	float quadratic;

	float innerCutoff;
	float outerCutoff;
};
uniform SpotLight spotLight;

uniform vec3 viewPos;

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir)
{
	vec3 lightDir = normalize(-light.direction);

	float diff = max(dot(lightDir, normal), 0.0);
	float spec = pow(max(dot(viewDir, reflect(light.direction, normal)), 0.0), material.shininess);

	vec3 ambient = light.ambient * texture(material.diffuse, vTexCoords).rgb;
	vec3 diffuse = light.diffuse * diff * texture(material.diffuse, vTexCoords).rgb;
	vec3 specular = light.specular * spec * texture(material.specular, vTexCoords).rgb;

	vec3 result = ambient + diffuse + specular;

	return result;
}

vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
	vec3 lightDir = normalize(light.position - fragPos);

	float diff = max(dot(lightDir, normal), 0.0);
	float spec = pow(max(dot(viewDir, reflect(-lightDir, normal)), 0.0), material.shininess);

	vec3 ambient = light.ambient * texture(material.diffuse, vTexCoords).rgb;
	vec3 diffuse = light.diffuse * diff * texture(material.diffuse, vTexCoords).rgb;
	vec3 specular = light.specular * spec * texture(material.specular, vTexCoords).rgb;

	float dist = length(light.position - fragPos);
	float attenuation = 1.0 / (light.constant + light.linear * dist + light.quadratic * (dist * dist));

	vec3 result = (ambient + diffuse + specular) * attenuation;

	return result;
}

vec3 CalcSpotLight(SpotLight light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
	vec3 lightDir = normalize(light.position - fragPos);

	float diff = max(dot(lightDir, normal), 0.0);
	float spec = pow(max(dot(viewDir, reflect(-lightDir, normal)), 0.0), material.shininess);

	vec3 ambient = light.ambient * texture(material.diffuse, vTexCoords).rgb;
	vec3 diffuse = light.diffuse * diff * texture(material.diffuse, vTexCoords).rgb;
	vec3 specular = light.specular * spec * texture(material.specular, vTexCoords).rgb;

	float theta = dot(lightDir, normalize(-light.direction));
	float epsilon = light.innerCutoff - light.outerCutoff;
	float intensity = clamp((theta - light.outerCutoff) / epsilon, 0.0, 1.0);
	diffuse *= intensity;
	specular *= intensity;

	float dist = length(light.position - fragPos);
	float attenuation = 1.0 / (light.constant + light.linear * dist + light.quadratic * (dist * dist));

	vec3 result = (ambient + diffuse + specular) * attenuation;

	return result;
}

void main()
{
	vec3 color = vec3(0.0);

	vec3 norm = normalize(vNormal);
	vec3 viewDir = normalize(viewPos - vFragPos);

	color += CalcDirLight(dirLight, norm, viewDir);

	for (int i = 0; i < NR_POINT_LIGHTS; i++)
	{
		color += CalcPointLight(pointLights[i], norm, vFragPos, viewDir);	
	}

	color += CalcSpotLight(spotLight, norm, vFragPos, viewDir);

	FragColor = vec4(color, 1.0);
}