<?php

declare(strict_types=1);

namespace App\Controller;

use ApiPlatform\Api\IriConverterInterface;
use App\ApiResource\UserDto;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfonycasts\MicroMapper\MicroMapperInterface;

class SecurityController extends AbstractController
{
    #[Route('/api/login', name: 'app_login', methods: ['POST'])]
    public function login(IriConverterInterface $iriConverter, #[CurrentUser] $user = null): Response
    {
        if (!$user) {
            return $this->json([
                'error' => 'Invalid login request: check that the Content-Type header is "application/json".',
            ], 401);
        }

        return new Response(null, 204, [
            'Location' => $iriConverter->getIriFromResource($user),
        ]);
    }

    #[Route('/api/logout', name: 'app_logout', methods: ['GET'])]
    public function logout(): void
    {
        throw new Exception('This should never be reached!');
    }

    // Just a dummy route to redirect to after logout, see security.yaml
    #[Route('/api/logout-success', name: 'app_logout_success', methods: ['GET'])]
    public function logoutSuccess(): Response
    {
        return new Response(null, 204);
    }

    #[Route('/api/me', name: 'app_me', methods: ['GET'])]
    public function me(
        IriConverterInterface $iriConverter,
        MicroMapperInterface $microMapper,
        #[CurrentUser] $user = null
    ): Response {
        if (!$user) {
            return $this->json([
                'error' => 'You are currently not logged in.',
            ], 401);
        }

        return $this->json([
            'id' => $iriConverter->getIriFromResource($microMapper->map(
                $user,
                UserDto::class
            )),
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'roles' => $user->getRoles(),
        ]);
    }
}
