#version 330 core

layout(location = 0) in vec2 aPos;
layout(location = 1) in vec3 aColor;

out VS_OUT
{
	vec4 pos;
	vec3 color;
} vs_out;

void main()
{
	vs_out.pos = vec4(aPos.x, aPos.y, 0.0, 1.0);
	vs_out.color = aColor;
}
