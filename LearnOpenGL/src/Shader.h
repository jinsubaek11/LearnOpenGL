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

	unsigned int GetProgram();

	unsigned int programId;

};

