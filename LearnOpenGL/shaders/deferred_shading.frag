#version 330 core

out vec4 FragColor;

in vec2 TexCoords;

uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform sampler2D gAlbedoSpec;

struct Light
{
	vec3 Position;
	vec3 Color;

	float Linear;
	float Quadratic;
	float Radius;
};

const int NR_LIGHTS = 32;
uniform Light lights[NR_LIGHTS];
uniform vec3 viewPos;

void main()
{
	vec3 FragPos = texture(gPosition, TexCoords).rgb;
	vec3 Normal = texture(gNormal, TexCoords).rgb;
	vec3 Diffuse = texture(gAlbedoSpec, TexCoords).rgb;
	float Specular = texture(gAlbedoSpec, TexCoords).a;

	vec3 lighting = Diffuse * 0.1;
	vec3 viewDir = normalize(viewPos - FragPos);

	for (int i = 0; i < NR_LIGHTS; i++)
	{
		float dist = length(lights[i].Position - FragPos);
		if (dist < lights[i].Radius)
		{
			vec3 lightDir = normalize(lights[i].Position - FragPos);
			vec3 diffuse = max(dot(Normal, lightDir), 0.0) * Diffuse * lights[i].Color;
		
			vec3 halfwayDir = normalize(viewDir + lightDir);
			float spec = pow(max(dot(halfwayDir, Normal), 0.0), 16.0);
			vec3 specular = lights[i].Color * spec * Specular;

			float attenuation = 1 / (1.0 + lights[i].Linear *dist + lights[i].Quadratic * dist * dist);
		
			diffuse *= attenuation;
			specular *= attenuation;
			lighting += diffuse + specular;
		}
	}

	FragColor = vec4(lighting, 1.0);
}