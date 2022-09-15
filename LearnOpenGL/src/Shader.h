#pragma once
#include "common.h"

#include <string>
#include <fstream>
#include <sstream>

class Shader
{
public:
	Shader(const char* vertexPath, const char* fragmentPath);

	void Use();

	void SetBool(const std::string& name, bool value) const;
	void SetInt(const std::string& name, int value) const;
	void SetFloat(const std::string& name, float value) const;
	void SetVec3(const std::string& name, glm::vec3 value) const;
	void SetVec3(const std::string& name, float v1, float v2, float v3) const;
	void SetMat4(const std::string& name, glm::mat4 value) const;

	unsigned int GetProgram();

	unsigned int programId;

};

