#pragma once
#include "common.h"
#include "Shader.h"

#define MAX_BONE_INFLUENCE 4

struct Vertex
{
	glm::vec3 Position;
	glm::vec3 Normal;
	glm::vec3 TexCoords;
	glm::vec3 Tangent;
	glm::vec3 BiTangent;

	int m_BoneIds[MAX_BONE_INFLUENCE];
	float m_Weights[MAX_BONE_INFLUENCE];
};

struct Texture
{
	unsigned int id;
	std::string type;
	std::string path;
};

class Mesh
{
public:
	Mesh(std::vector<Vertex> vertices, std::vector<unsigned int> indices,
		std::vector<Texture> textures);

	void Draw(Shader& shader);

private:
	void SetupMesh();

public:
	std::vector<Vertex> vertices;
	std::vector<unsigned int> indices;
	std::vector<Texture> textures;
	unsigned int VAO;

private:
	unsigned int VBO, EBO;
};

