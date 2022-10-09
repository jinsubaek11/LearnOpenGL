#version 330 core

in VS_OUT
{
	vec3 FragPos;
	vec2 TexCoords;
	vec3 TangentsLightPos;
	vec3 TangentsViewPos;
	vec3 TangentsFragPos;
} fs_in;

uniform sampler2D diffuseMap;
uniform sampler2D normalMap;

out vec4 fragColor;

void main()
{
	vec3 diffuse = texture(diffuseMap, fs_in.TexCoords).rgb;
	vec3 normal = texture(normalMap, fs_in.TexCoords).rgb;
	normal = normalize(normal * 2.0 - 1.0);
	//normal = normal * 0.5 + 0.5;

	vec3 lightColor = vec3(0.2);

	vec3 lightDir = normalize(fs_in.TangentsLightPos - fs_in.FragPos);
	vec3 viewDir = normalize(fs_in.TangentsViewPos - fs_in.FragPos);
	vec3 halfwayDir = normalize(viewDir + lightDir);

	vec3 ambient = 0.1 * diffuse;

	float diff = max(dot(lightDir, normal), 0.0);
	diffuse = diff * diffuse;

	float spec = pow(max(dot(normal, halfwayDir), 0.0), 64.0);
	vec3 specular = spec * lightColor;

	vec3 color = ambient + diffuse + specular;

	fragColor = vec4(color, 1.0);
	//fragColor = vec4(1.0,1.0,0.0,1.0);
}