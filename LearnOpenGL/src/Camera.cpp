#include "Camera.h"

Camera::Camera(glm::vec3 position, glm::vec3 up, float yaw, float pitch)
	: Position(position), WorldUp(up), Yaw(yaw), Pitch(pitch),
	Front(glm::vec3(0.f, 0.f, -1.f)), MovementSpeed(SPEED), 
	MouseSensitivity(SENSITIVITY), Zoom(ZOOM)
{
	UpdateCameraVectors();
}

Camera::Camera(float posX, float posY, float posZ, float upX, 
	float upY, float upZ, float yaw, float pitch)
	: Position(glm::vec3(posX, posY, posZ)), WorldUp(glm::vec3(upX, upY, upZ)), 
	Yaw(yaw), Pitch(pitch), Front(glm::vec3(0.f, 0.f, -1.f)), 
	MovementSpeed(SPEED), MouseSensitivity(SENSITIVITY), Zoom(ZOOM)
{
	UpdateCameraVectors();
}

void Camera::ProcessKeyboard(Camera_Movement direction, float deltaTime)
{
	float velocity = MovementSpeed * deltaTime;

	if (direction == FORWARD)
		Position += Front * velocity;
	if (direction == BACKWARD)
		Position -= Front * velocity;
	if (direction == LEFT)
		Position -= Right * velocity;
	if (direction == RIGHT)
		Position += Right * velocity;
	if (direction == UP)
		Position += Up * velocity;
	if (direction == DOWN)
		Position -= Up * velocity;
}

void Camera::ProcessMouseMovement(float xoffset, float yoffset, GLboolean constraintPitch)
{
	xoffset *= MouseSensitivity;
	yoffset *= MouseSensitivity;

	Yaw += xoffset;
	Pitch += yoffset;

	if (constraintPitch)
	{
		if (Pitch >   89.f)  Pitch =  89.f;
		if (Pitch <  -89.f)  Pitch = -89.f;
		if (Yaw   <   0.0f)  Yaw += 360.0f;
		if (Yaw   > 360.0f)  Yaw -= 360.0f;
	}

	UpdateCameraVectors();
}

void Camera::ProcessMouseScroll(float yoffset)
{
	Zoom -= (float)yoffset;

	if (Zoom < 1.f)  Zoom = 1.f;
	if (Zoom > 45.f) Zoom = 45.f;
}

void Camera::UpdateCameraVectors()
{
	glm::vec3 front;
	front.x = cos(glm::radians(Yaw)) * cos(glm::radians(Pitch));
	front.y = sin(glm::radians(Pitch));
	front.z = sin(glm::radians(Yaw)) * cos(glm::radians(Pitch));

	Front = glm::normalize(front);
	Right = glm::normalize(glm::cross(Front, WorldUp));
	Up = glm::normalize(glm::cross(Right, Front));
}
