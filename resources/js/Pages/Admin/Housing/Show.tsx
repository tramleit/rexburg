import { Head, Link } from '@inertiajs/react';
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/outline';
import Admin from '@/Layouts/AdminLayout';
import { convertDateFromNow } from '@/Utils/convertDate';
import convertKey from '@/Utils/convertKey';
import classNames from '@/Utils/classNames';
import { Housing, PageProps } from '@/types';

export default function HousingShow({ auth, housing }: PageProps & { housing: Housing }) {
  return (
    <Admin
      user={auth.user}
    >
      <Head title={housing.name} />

      <div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="shrink-0">
              <div className="relative">
                <img src={housing.profile_image_url} alt={housing.name} className="h-16 w-16 rounded-full object-cover" />
                <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {housing.name}
              </h1>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <Link
              href={route('housing.show', [housing.slug])}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              <EyeIcon className="h-5 w-5" />
            </Link>
            <Link
              href={route('admin.housing.edit', [housing.id])}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              <PencilSquareIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="max-w-8xl mx-auto my-8 grid grid-cols-1 gap-6 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            <section>
              <div className="shadow sm:overflow-hidden sm:rounded-lg">
                <img
                  className="h-36 w-full object-cover"
                  src={housing.cover_image_url}
                  alt={housing.name}
                />
              </div>
            </section>

            <section aria-labelledby="housing-information-title">
              <div className="relative bg-white shadow sm:overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="housing-information-title" className="text-lg font-medium leading-6 text-gray-900">
                    Housing Information
                  </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {housing.name}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Website</dt>
                      <dd className="mt-1 text-sm text-gray-900">{housing.website_url}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900">{housing.email_address}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="mt-1 text-sm text-gray-900">{housing.phone_number}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Address</dt>
                      <dd className="mt-1 text-sm text-gray-900">{`${housing.street}, ${housing.city}, Idaho ${housing.postal_code}`}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">About</dt>
                      <div className="prose prose-lg mt-1 text-sm text-gray-900" dangerouslySetInnerHTML={{ __html: housing.about }} />
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Rent</dt>
                      <dd className="mt-1 text-sm text-gray-900">{housing.rent_range}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Housing Type</dt>
                      <dd className="mt-1 text-sm text-gray-900">{housing.housing_type}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Bedrooms</dt>
                      <dd className="mt-1 text-sm text-gray-900">{housing.bedroom_range}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Bathrooms</dt>
                      <dd className="mt-1 text-sm text-gray-900">{housing.bathroom_range}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            <section aria-labelledby="reviews-title">
              <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="reviews-title" className="text-lg font-medium text-gray-900">
                      Reviews
                    </h2>
                  </div>
                  <div className="px-4 py-6 sm:px-6">
                    <div className="space-y-8">
                      {housing.reviews.map((review) => (
                        <li key={housing.id}>
                          <div className="flex space-x-3">
                            <div className="shrink-0">
                              <img
                                src={review.user.profile_photo_url}
                                alt={review.user.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-sm">
                                <Link href="#" className="font-medium text-gray-900">
                                  {review.user.name}
                                </Link>
                              </div>
                              <div className="mt-1 text-sm text-gray-700">
                                <p>
                                  {review.body}
                                </p>
                              </div>
                              <div className="mt-2 space-x-2 text-sm">
                                <div className="font-medium text-gray-500">
                                  {convertDateFromNow(review.created_at)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <Link href="#" className="block bg-sky-50 p-4 text-center text-sm font-medium text-sky-500 hover:text-sky-700 sm:rounded-b-lg">
                    View all reviews
                  </Link>
                </div>
              </div>
            </section>

            <section aria-labelledby="actions-title">
              <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="actions-title" className="text-lg font-medium text-gray-900">
                      Actions
                    </h2>
                  </div>
                  <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                    <div>
                      <h3 className="text-base font-medium leading-6 text-gray-900">
                        Delete Housing
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Once you delete this housing, there is no going back.
                      </p>
                    </div>
                    <button className="inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                      Delete housing
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="managers-title">
              <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="managers-title" className="text-lg font-medium text-gray-900">
                      Managers
                    </h2>
                  </div>
                  {housing.managers.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {housing.managers.map((manager) => (
                        <li key={manager.id} className="flex items-center justify-between gap-x-6 px-4 py-5">
                          <div className="flex min-w-0 gap-x-4">
                            <img
                              className="h-12 w-12 flex-none rounded-full bg-gray-50"
                              src={manager.profile_photo_url}
                              alt={manager.name}
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">{manager.name}</p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{manager.email}</p>
                            </div>
                          </div>
                          <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                            Remove manager
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="py-4 text-center">
                      <UserIcon className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm font-semibold text-gray-900">No Managers to display</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          <section aria-labelledby="revision-history-title" className="lg:col-span-1 lg:col-start-3">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 id="revision-history-title" className="text-lg font-medium text-gray-900">
                  Revision History
                </h2>
              </div>
              <div className="flow-root border-t border-gray-200">
                <ul className="space-y-6 overflow-hidden px-2 py-6">
                  {housing.revision_history.map((item, itemIdx) => (
                    <li className="relative flex flex-wrap gap-x-1" key={item.id}>
                      <div
                        className={classNames(
                          itemIdx === housing.revision_history.length - 1 ? 'h-6' : '-bottom-6',
                          'absolute left-0 top-0 flex w-6 justify-center',
                        )}
                      >
                        <div className="w-px bg-gray-200" />
                      </div>
                      <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                      </div>
                      <div>
                        <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                          {item.key === 'created_at' ? (
                            <p>Housing profile created {convertDateFromNow(item.created_at)}.</p>
                          ) : (
                            <>
                              <span className="font-medium text-gray-900">{item.user?.name}</span> updated the {convertKey(item.key)} {convertDateFromNow(item.updated_at)}.
                            </>
                          )}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link href="#" className="block bg-sky-50 p-4 text-center text-sm font-medium text-sky-500 hover:text-sky-700 sm:rounded-b-lg">
                  View full history
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Admin>
  );
}
