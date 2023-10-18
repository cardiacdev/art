<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use App\Factory\UserFactory;
use Zenstruck\Browser\Json;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class UserResourceTest extends ApiTestCase
{
    use Factories;
    use ResetDatabase;

    public function testGetUser(): void
    {
        $user = UserFactory::createOne([
            'email' => 'test@example.com',
            'username' => 'test',
        ]);

        $this->browser()
            ->actingAs($user)
            ->get('/api/users/'.$user->getId())
            ->assertStatus(200)
            ->assertJsonMatches('"@id"', '/api/users/'.$user->getId())
            ->assertJsonMatches('email', $user->getEmail())
            ->assertJsonMatches('username', $user->getUsername());
    }

    public function testGetUsers(): void
    {
        $user = UserFactory::createOne();
        UserFactory::createMany(5);

        $this->browser()
            ->actingAs($user)
            ->get('/api/users')
            ->assertStatus(200)
            ->dump()
            ->assertJsonMatches('"hydra:totalItems"', 6)
            ->assertJsonMatches('length("hydra:member")', 6);
    }

    public function testPostToCreateUser(): void
    {
        $this->browser()
            ->post('/api/users', [
                'json' => [
                    'email' => 'draggin_in_the_morning@coffee.com',
                    'username' => 'draggin_in_the_morning',
                    'password' => 'password',
                ],
            ])
            ->assertStatus(201)
            ->use(function (Json $json) {
                $json->assertMissing('password');
                $json->assertMissing('id');
            })
            ->post('/login', [
                'json' => [
                    'email' => 'draggin_in_the_morning@coffee.com',
                    'password' => 'password',
                ],
            ])
            ->assertSuccessful();
    }

    public function testPatchToUpdateUser(): void
    {
        $user = UserFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->patch('/api/users/'.$user->getId(), [
                'json' => [
                    'username' => 'changed',
                ],
                'headers' => ['Content-Type' => 'application/merge-patch+json'],
            ])
            ->assertStatus(200);
    }

    public function testDeleteUser(): void
    {
        $user = UserFactory::createOne();

        $this->browser()
            ->actingAs($user)
            ->delete('/api/users/'.$user->getId())
            ->assertStatus(204);
    }
}
